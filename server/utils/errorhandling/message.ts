import type { IncomingMessage, ServerResponse } from 'http';
import { UserCredential } from 'firebase/auth';

export class Message {
  /**
   * Notify of success
   * @param res the server response
   * @param user the user logged information
   * @returns the new server response
   */
  static success(res: ServerResponse, user: UserCredential): ServerResponse {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ user }));
    return res;
  }

  /**
   * Notify of bad content input by the user
   * @param res the server response
   * @param err the content responsible for the error
   * @returns the new server response
   */
  static errorContent(res: ServerResponse, err): ServerResponse {
    res.writeHead(409, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        invalid: [],
        code: err.code,
        message: err.message,
        name: err.name,
      }),
    );
    return res;
  }

  /**
   * Notify of bad user credentials
   * @param res the server response
   * @returns the new server response
   */
  static errorCredentials(res: ServerResponse): ServerResponse {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        invalid: ['email', 'password'],
        message: 'Invalid email or password',
      }),
    );
    return res;
  }
  /**
   * Notify of a server error
   * @param res the server response
   * @returns the new server response
   */
  static errorServer(res: ServerResponse): ServerResponse {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        invalid: [],
        message: 'Server error!',
      }),
    );
    return res;
  }
}
