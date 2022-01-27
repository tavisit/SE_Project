export const notificationsArray = [
  'Null',
  'Success',
  'CredentialsLogin',
  'Other',
];

export class NotificationsBack {
  static notification: string;

  static setNotification(notif: string): void {
    this.notification = notif;
  }
  static getNotification(): string {
    return this.notification;
  }
}
