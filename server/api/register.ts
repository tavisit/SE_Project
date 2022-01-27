import type { IncomingMessage, ServerResponse } from 'http';
import { register } from '../utils/firebase_logic/auth';
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

// TODO make a response handler to send errors and such

export default (req: IncomingMessage, res: ServerResponse) => {
  const form = formidable();
  form.parse(req, async (err, fields, _) => {
    if (!err) {
      const { email, password } = fields as LoginParams;
      if (email && password && email.trim() && password.trim()) {
        try {
          const user = await register(email.trim(), password.trim());
          res = Message.success(res, user);
          NotificationsBack.setNotification(notificationsArray[0]);
        } catch (err) {
          res = Message.errorContent(res, err);
          NotificationsBack.setNotification(notificationsArray[1]);
        }
      } else {
        res = Message.errorCredentials(res);
        NotificationsBack.setNotification(notificationsArray[2]);
      }
    } else {
      res = Message.errorServer(res);
      NotificationsBack.setNotification(notificationsArray[3]);
    }
  });
};
