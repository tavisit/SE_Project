// Fields that make an object an IUser
export const mandatoryUserFields = [
  'id',
  'token',
  'name',
  'email',
  'expiration',
];

export interface IUser {
  id: string;
  token: string;
  name: string;
  email: string;
  expiration: number;
}

export /**
 * When vue | nuxt hydrates the app, they expect to receive a pure object, no methods attached.
 * Those are not serializable and will cause errors.
 *
 * It is, however, able to fix nested ref objects (like cookie_ref)
 */
class User implements IUser {
  id: string;
  token: string;
  name: string;
  email: string;
  expiration: number;
  isValid: boolean;
  isAuthenticated: boolean;

  constructor(user?: IUser | null) {
    // console.log('received inside constructor', user);
    if (!user || !User.implementsIUser(user)) {
      user = {
        id: '',
        token: '',
        name: '',
        email: '',
        expiration: 0,
      };
    }

    this.id = user.id.trim();
    this.token = user.token.trim();
    this.name = user.name.trim();
    this.email = user.email.trim();
    this.expiration = user.expiration >= 0 ? user.expiration : 0;

    this.isValid = !!(this.id && this.email);
    this.isAuthenticated =
      this.isValid &&
      this.token !== '' &&
      new Date(this.expiration) >= new Date();
  }

  /**
   * Check if an unknown resource implements IUser
   * @param user Possibly a deserialized user object
   */
  static implementsIUser(user: unknown): boolean {
    const validObject =
      !!user &&
      typeof user === 'object' &&
      !Array.isArray(user) &&
      user !== null;
    if (!validObject) return false;

    const userKeys = Object.keys(user);
    return (
      userKeys.length >= mandatoryUserFields.length &&
      mandatoryUserFields.reduce((acc, field) => {
        return acc && userKeys.includes(field);
      }, true)
    );
  }
}
