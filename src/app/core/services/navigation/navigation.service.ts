import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IAppService } from '../../models/permission.model';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/java-builder-ui']);
  }

  navigateToRoleList() {
    this.router.navigate(['/java-builder-ui/role/list']);
  }

  navigateToNewRole() {
    this.router.navigate(['/java-builder-ui/role/new']);
  }

  navigateToFormList() {
    this.router.navigate(['/java-builder-ui/form/list']);
  }

  navigateToNewForm(serviceId: string = '') {
    this.router.navigate(['/java-builder-ui/form/new', serviceId]);
  }

  navigateToServiceList() {
    this.router.navigate(['/java-builder-ui/service/list']);
  }

  navigateToNewService() {
    this.router.navigate(['/java-builder-ui/service/new']);
  }

  navigateToMenu(menuDetails: IAppService) {
    if (menuDetails.name == 'Roles') this.navigateToRoleList();
    else if (menuDetails.name == 'Services') this.navigateToServiceList();
    else {
      this.router.navigate(['/java-builder-ui/menu', menuDetails.id]);
    }
  }
}
