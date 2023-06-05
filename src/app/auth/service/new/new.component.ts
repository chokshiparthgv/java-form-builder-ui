import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  serviceForm!: FormGroup;

  constructor(
    public navigationServiceProvider: NavigationService,
    private menuServiceProvider: MenuService,
    private notificationServiceProvider: NotificationService
  ) {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  saveService() {
    this.serviceForm.disable();
    this.menuServiceProvider
      .addNewService(this.serviceForm.value)
      .subscribe(async () => {
        await this.menuServiceProvider.updateListOfAllServices();
        await this.menuServiceProvider.updateListOfServices();
        this.notificationServiceProvider.addNewNotification({
          name: 'New service added!',
          isReadByUser: false,
          redirectionUrl: 'navigateToServiceList'
        })
        this.serviceForm.enable();
        this.serviceForm.reset();
        this.navigationServiceProvider.navigateToServiceList();
      });
  }
}
