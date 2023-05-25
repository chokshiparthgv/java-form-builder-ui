import { Component } from '@angular/core';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  constructor(public navigationServiceProvider: NavigationService) {
    this.navigationServiceProvider.navigateToRoleList();
  }
}
