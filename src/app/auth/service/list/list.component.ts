import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IAppService } from 'src/app/core/models/permission.model';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { AssignFormComponent } from '../assign-form/assign-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  public listOfServices: IAppService[] = [];
  public displayColumns: string[] = ['Name', 'Form Name', 'Actions'];
  isLoading = true;

  constructor(
    private menuServiceProvider: MenuService,
    private dialog: MatDialog,
    public navigationServiceProvider: NavigationService
  ) {
    this.menuServiceProvider.allServices$.subscribe((response) => {
      this.listOfServices = response;
      this.isLoading = false;
    });
  }

  openDialog(serviceInfo: IAppService) {
    this.dialog.open(AssignFormComponent, {
      data: serviceInfo,
    });
  }
}
