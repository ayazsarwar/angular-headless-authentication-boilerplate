import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  id: number = 0;
  pendingNotifications: NotificationInterface[] = [];
  constructor() {}

  push(notificationData: NotificationInterface) {
    let notification = this.createNotification(notificationData);
    this.pendingNotifications.push(notification);
    if (notification.autoClose) {
      setTimeout(() => {
        this.pop(notification.id);
      }, notification.timer);
    }
  }
  pop(id?: number) {
    if (!id) return;
    let index = this.pendingNotifications.findIndex((n) => n.id == id);
    this.pendingNotifications.splice(index, 1);
  }
  createNotification(data: NotificationInterface): NotificationInterface {
    return {
      id: ++this.id,
      type: 'default',
      timer: 4000,
      autoClose: true,
      ...data,
    };
  }
}

interface NotificationInterface {
  id?: number;
  type?: string;
  msg: string;
  timer?: number;
  autoClose?: boolean;
}
