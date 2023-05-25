import { Component } from '@angular/core';
import { Role } from 'src/app/core/models/role.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { RoleService } from 'src/app/core/services/role/role.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  public roles!: Role[];
  public isLoadingRoles = false;
  constructor(
    public roleServiceProvider: RoleService,
    private menuServiceProvider: MenuService,
    public notificationServiceProvider: NotificationService 
  ) {}
  setCurrentRole(role: Role) {
    this.roleServiceProvider.setCurrentRole(role.id);
    this.menuServiceProvider.getListOfServices();
  }

  toggleSideNav() {
    this.menuServiceProvider.updateSideNavStatus();
  }

}
