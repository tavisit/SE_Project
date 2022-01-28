import { CookieOptions, useState } from '#app';
import { IUser, User } from './types';

const authCookieOptions: CookieOptions<IUser> = {
  sameSite: 'strict',
  httpOnly: false,
  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
};

export const useAuth = () => {
  // mingle User objects, update cookies when needed
  const userRef = useState('user', () => {
    const iuser = new User(useCookie<IUser>('user', authCookieOptions).value);
    // console.log('parsed from previousely received', iuser);
    // convert to pure object, see comments of User class
    return { ...iuser };
  });

  watch(userRef, (newUser) => {
    useCookie<IUser>('user', authCookieOptions).value = newUser;
  });

  return userRef;
};
