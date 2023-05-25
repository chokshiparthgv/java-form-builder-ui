import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GenericFormService } from 'src/app/core/services/generic-form/generic-form.service';
import { AssignServiceComponent } from '../assign-service/assign-service.component';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  isLoading = false;
  listOfForms = [];
  displayColumns = ['Name', 'Description', 'Actions'];

  constructor(
    private formServiceProvider: GenericFormService,
    private dialog: MatDialog,
    public navigationServiceProvider: NavigationService
  ) {
    this.isLoading = true;
    this.formServiceProvider.getAllForms().subscribe((response) => {
      this.listOfForms = response;
      this.isLoading = false;
    });
  }

  openAssignServiceModel(element: any) {
    this.dialog.open(AssignServiceComponent, {
      data: element,
    });
  }
}
