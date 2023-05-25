import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../../models/notification.model';
import { generateUUID } from '../../helpers/utility';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public listOfNotifications!: BehaviorSubject<INotification[]>;
  constructor() {}

  addNewNotification(newNotification: INotification) {
    newNotification.id = generateUUID();
    if (this.listOfNotifications) {
      const listOfExistingNotifications = this.listOfNotifications.getValue();
      listOfExistingNotifications.push(newNotification);
      this.listOfNotifications.next(listOfExistingNotifications);
    } else {
      this.listOfNotifications = new BehaviorSubject([newNotification]);
    }
  }

  readNotification(notificationId: string | undefined) {
    if (notificationId) {
      const notifications = this.listOfNotifications.getValue();
      const updatedNotifications = notifications.filter(
        (notification) => notification.id != notificationId
      );
      this.listOfNotifications.next(updatedNotifications);
    }
  }

  clearAllNotifications() {
    this.listOfNotifications.next([]);
  }
}
