import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  navigateToRoleList() {
    this.router.navigate(['/dashboard/role/list']);
  }

  navigateToNewRole() {
    this.router.navigate(['/dashboard/role/new']);
  }

  navigateToFormList() {
    this.router.navigate(['/dashboard/form/list']);
  }

  navigateToNewForm(serviceId: string = '') {
    this.router.navigate(['/dashboard/form/new', serviceId]);
  }

  navigateToServiceList() {
    this.router.navigate(['/dashboard/service/list']);
  }

  navigateToNewService() {
    this.router.navigate(['/dashboard/service/new']);
  }

  navigateToMenu() {
    this.router.navigate(['/dashboard/menu']);
  }
}
