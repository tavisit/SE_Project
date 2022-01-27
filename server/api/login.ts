import { useCookie, setCookie } from 'h3';
import type { IncomingMessage, ServerResponse } from 'http';
import { login } from '../utils/firebase_logic/auth';
import formidable from 'formidable';
import { Message } from '../utils/errorhandling/message';

export interface LoginParams {
  email?: string;
  password?: string;
}

const form = formidable();

// TODO make a response handler to send errors and such

export default (req: IncomingMessage, res: ServerResponse) => {
  const cookie = useCookie(req, 'user');
  form.parse(req, async (err, fields, _) => {
    if (!err) {
      const { email, password } = fields as LoginParams;
      if (email && password && email.trim() && password.trim()) {
        try {
          const user = await login(email.trim(), password.trim());
          res = Message.success(res, user);
        } catch (err) {
          console.log(err);
          res = Message.errorContent(res, err);
        }
      } else {
        console.log(err);
        res = Message.errorCredentials(res);
      }
    } else {
      console.log(err);
      res = Message.errorServer(res);
    }
  });
};
