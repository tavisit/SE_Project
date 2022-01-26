import { CookieOptions, CookieRef, useState } from '#app'

interface IUser {
  id: string;
  token: string;
  name: string;
  email: string;
}

const mandatoryUserFields = [
  "id",
  "token",
  "name",
  "email"
];

const cookieOptions: CookieOptions<IUser> = {
  sameSite: 'strict',
  expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
}

class CookieUser implements IUser {
  cookie_ref_name: string;
  id: string;
  token: string;
  name: string;
  email: string;

  // New invalid user
  constructor(cookie_ref_name: string) {
    this.cookie_ref_name = cookie_ref_name;
    const cookie_ref = useCookie<IUser>(this.cookie_ref_name, cookieOptions);
    let user: IUser = cookie_ref.value;
    if (!user || !CookieUser.implementsIUser(user)) {
      user = {
        id: '',
        token: '',
        name: '',
        email: ''
      };
      cookie_ref.value = user;
    }

    this.id = user.id.trim();
    this.token = user.token.trim();
    this.name = user.name.trim();
    this.email = user.email.trim();
  }

  save() {
    const iuser: IUser = {
      id: this.id,
      token: this.token,
      name: this.name,
      email: this.email
    };
    useCookie<IUser>(this.cookie_ref_name, cookieOptions).value = iuser;
  }

  /**
   * Check if the user is valid
   */
  public isValid(): boolean {
    return !!(this.id && this.email);
  }

  isAuthenticated(): boolean {
    // TODO add expireAt check
    return this.isValid() && this.token !== '';
  }

  /**
   * Check if an unknown resource implements IUser
   * @param user Possibly a deserialized user object
   */
  static implementsIUser(user: any): boolean {
    return typeof user === 'object' &&
      !Array.isArray(user) &&
      user !== null &&
      Object.keys(user).length >= mandatoryUserFields.length &&
      Object.keys(user).reduce((acc, field) => {
        return acc && mandatoryUserFields.includes(field);
      }, true);
  }
}

export const useAuth = () => {
  return ref(new CookieUser('user'));
}
