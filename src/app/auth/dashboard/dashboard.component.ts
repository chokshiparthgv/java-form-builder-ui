import { Component } from '@angular/core';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { IAppService } from './../../core/models/permission.model';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  isLoading = true;
  public listOfServices: IAppService[] = [];
  public activeMenu = '';
  constructor(
    public menuServiceProvider: MenuService,
    private router: Router,
    public navigationServiceProvider: NavigationService
  ) {
    this.menuServiceProvider.currentMenu$.subscribe((currentMenu) => {
      if (currentMenu) {
        if (currentMenu.name == 'Roles') {
          this.navigationServiceProvider.navigateToRoleList();
        } else if (currentMenu.name == 'Services') {
          this.navigationServiceProvider.navigateToServiceList();
        } else {
          this.router.navigate(['/java-builder-ui/menu', currentMenu.id]);
        }
      }
    });
  }

  redirectToMenu(menuDetails: IAppService) {
    this.menuServiceProvider.updateCurrentMenu(menuDetails.id);
    if (menuDetails.name == 'Roles')
      this.navigationServiceProvider.navigateToRoleList();
    else if (menuDetails.name == 'Services')
      this.navigationServiceProvider.navigateToServiceList();
    else {
      this.router.navigate(['/java-builder-ui/menu', menuDetails.id]);
    }
  }

  redirectToService() {
    this.navigationServiceProvider.navigateToServiceList();
  }
}
