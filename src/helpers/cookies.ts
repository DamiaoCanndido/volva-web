import { setCookie } from 'cookies-next';

export const createCookies = (key: string, value: any) => {
  setCookie(key, value, {
    maxAge: 604800000,
    expires: new Date(Date.now() + 604800000),
  });
};
