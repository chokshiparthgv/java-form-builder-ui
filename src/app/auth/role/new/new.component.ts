import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { RoleService } from 'src/app/core/services/role/role.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent{
  roleForm!: FormGroup;

  constructor(
    private roleServiceProvider: RoleService,
    public navigationServiceProvider: NavigationService,
    private notificationServiceProvider: NotificationService
  ) {
    this.roleForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }

  redirectToRoleList() {
    this.navigationServiceProvider.navigateToRoleList();
  }

  saveRole() {
    this.roleServiceProvider
      .addNewRole(this.roleForm.value)
      .subscribe(async (response) => {
        await this.roleServiceProvider.setListOfRoles();
        this.notificationServiceProvider.addNewNotification({
          name: 'New role added!',
          isReadByUser: false,
          redirectionUrl: 'navigateToRoleList'
        });
        this.navigationServiceProvider.navigateToRoleList();
      });
  }
}
