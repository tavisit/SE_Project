import type { IncomingMessage, ServerResponse } from 'http';
import { register } from '../utils/firebase_logic/auth';
import formidable from 'formidable';

export interface LoginParams {
  email?: string;
  password?: string;
}

// TODO make a response handler to send errors and such

export default (req: IncomingMessage, res: ServerResponse) => {
  const form = formidable();
  form.parse(req, async (err, fields, _) => {
    if (!err) {
      const { email, password } = fields as LoginParams;
      console.log(email, password);
      if (email && password && email.trim() && password.trim()) {
        try {
          const user = await register(email.trim(), password.trim());
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ user }));
        }
        catch(err) {
          res.writeHead(409, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            invalid: [],
            code: err.code,
            message: err.message,
            name: err.name,
          }));
        }
      }
      else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          invalid: [ 'email', 'password'],
          message: 'Invalid email or password',
        }));
      }
    }
    else {
      console.log(err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          invalid: [],
          message: 'Server error!',
        }));
    }
  });
};
