import { loadCookie, TOKEN_COOKIE } from './cookieHandler';

export class RequestError extends Error {
  constructor(response, body) {
    super(body.message || 'Action failed');
    this.response = response;
    this.body = body;
  }
}

const isJson = (response) => {
  const contentType = response.headers.get('content-type');
  return contentType && contentType.indexOf('application/json') !== -1;
};

export const buildRequest =  (path, { method, body, headers }) => new Request(
  `${process.env.REACT_APP_API}${path}`,
  {
    headers: {
      'Accept': 'application/json', // eslint-disable-line quote-props
      'Content-Type': 'application/json',
      ...headers,
    },
    method,
    body: JSON.stringify(body),
  },
);

export const buildAuthorizedRequest = (path, args = {}) => {
  const headers = args.headers || {};
  headers.Authorization = `Bearer ${loadCookie(TOKEN_COOKIE)}`;
  return buildRequest(path, { ...args, headers });
};

export const handleResponse = (response) => {
  if (isJson(response)) {
    const asJson = response.json();
    if (!response.ok) {
      return asJson.then((responseBody) => {
        throw new RequestError(response, responseBody);
      });
    }
    return asJson;
  }

  return undefined;
};

export const sendRequest = request => fetch(request).then(handleResponse);

export const request = (...args) => sendRequest(buildRequest(...args));

export const authorizedRequest = (...args) => sendRequest(buildAuthorizedRequest(...args));
