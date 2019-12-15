import { buildAuthorizedRequest, sendRequest, authorizedRequest } from './request';

const requestUnlessCached = async (...params) => {
  const req = buildAuthorizedRequest(...params);
  const match = await caches.match(req);
  if (match) {
    return Promise.resolve();
  }
  return sendRequest(req);
};

export default () => {
  if (!('caches' in window)) {
    return Promise.resolve();
  }

  return Promise.all([
    requestUnlessCached('categories'),
    authorizedRequest('routes')
      .then(routes => Promise.all(
        routes.saved.map(({ id }) => requestUnlessCached(`routes/${id}`)),
      )),
  ]);
};
