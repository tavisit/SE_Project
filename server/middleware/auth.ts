import { useCookie, setCookie } from 'h3';
import { User } from '~~/composables/user/types';

export default async (req, res, next) => {
  const cookie = useCookie(req, 'user');

  if (cookie) {
    const cookieData = JSON.parse(cookie);
    const user = { ...new User(cookieData) };
    req.user = user;
    setCookie(res, 'user', JSON.stringify(user));
  }

  next();
};
