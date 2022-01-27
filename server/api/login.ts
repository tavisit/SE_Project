import { useCookie, setCookie } from 'h3';
import type { IncomingMessage, ServerResponse } from 'http';
import { login } from '../utils/firebase_logic/auth';
import formidable from 'formidable';
import { Message } from '../utils/errorhandling/message';
import {
  notificationsArray,
  NotificationsBack,
} from '~~/composables/Popup/notifications';

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
          NotificationsBack.setNotification(notificationsArray[0]);
        } catch (err) {
          console.log(err);
          res = Message.errorContent(res, err);
          NotificationsBack.setNotification(notificationsArray[1]);
        }
      } else {
        console.log(err);
        res = Message.errorCredentials(res);
        NotificationsBack.setNotification(notificationsArray[2]);
      }
    } else {
      console.log(err);
      res = Message.errorServer(res);
      NotificationsBack.setNotification(notificationsArray[3]);
    }
  });
};
