import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const TOKEN_COOKIE = 'token';
export const USER_NAME_COOKIE = 'userName';
export const USER_EMAIL_COOKIE = 'userEmail';

const daysInSeconds = n => n * (24 * 60 * 60);

export const saveCookie = (name, value) => {
  const cookieOptions = {
    path: '/',
    maxAge: daysInSeconds(14),
  };

  cookies.set(name, value, cookieOptions);
};

export const loadCookie = name => cookies.get(name);

export const removeCookie = name => cookies.remove(name);
