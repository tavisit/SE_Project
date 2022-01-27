// Fields that make an object an IUser
export const mandatoryUserFields = ['id', 'token', 'name', 'email'];

export interface IUser {
  id: string;
  token: string;
  name: string;
  email: string;
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
  isValid: boolean;
  isAuthenticated: boolean;

  constructor(user?: IUser | null) {
    if (!user || !User.implementsIUser(user)) {
      user = {
        id: '',
        token: '',
        name: '',
        email: '',
      };
    }

    this.id = user.id.trim();
    this.token = user.token.trim();
    this.name = user.name.trim();
    this.email = user.email.trim();

    this.isValid = !!(this.id && this.email);
    this.isAuthenticated = this.isValid && this.token !== '';
  }

  /**
   * Check if an unknown resource implements IUser
   * @param user Possibly a deserialized user object
   */
  static implementsIUser(user: unknown): boolean {
    return (
      !!user &&
      typeof user === 'object' &&
      !Array.isArray(user) &&
      user !== null &&
      Object.keys(user).length >= mandatoryUserFields.length &&
      Object.keys(user).reduce((acc, field) => {
        return acc && mandatoryUserFields.includes(field);
      }, true)
    );
  }
}
