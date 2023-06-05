import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { RoleService } from '../core/services/role/role.service';
import { MenuService } from '../core/services/menu/menu.service';
import { Router } from '@angular/router';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {
  constructor(
    private roleServiceProvider: RoleService,
    private menuServiceProvider: MenuService,
    private router: Router
  ) {
    this.loadRoles();
  }
  async loadRoles() {
    const isRolesExist = await this.roleServiceProvider.setListOfRoles();
    if (isRolesExist) {
      await this.menuServiceProvider.updateListOfAllServices();
      await this.menuServiceProvider.updateListOfServices();
      this.router.navigate(['/java-builder-ui']);
    }
  }
}
