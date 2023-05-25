import { Component, Inject } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAppService } from 'src/app/core/models/permission.model';
import { GenericFormService } from 'src/app/core/services/generic-form/generic-form.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
  selector: 'app-assign-service',
  templateUrl: './assign-service.component.html',
  styleUrls: ['./assign-service.component.css'],
})
export class AssignServiceComponent {
  isLoading = false;
  assignServiceForm!: FormGroup;
  listOfServices: IAppService[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuServiceProvider: MenuService,
    private formServiceProvider: GenericFormService,
    private dialogRef: MatDialogRef<AssignServiceComponent>
  ) {
    this.isLoading = true;
    this.assignServiceForm = new FormGroup({
      serviceName: new FormControl('', Validators.required),
    });
    this.menuServiceProvider
      .getListOfServices()
      .subscribe((response: IAppService[]) => {
        this.listOfServices = response;
        this.isLoading = false;
      });
  }
  saveAssignService() {
    const serviceInfo = this.assignServiceForm.value;
    this.formServiceProvider
      .assignFormToService(serviceInfo.serviceName.id, this.data.id)
      .subscribe(async (response) => {
        await this.menuServiceProvider.updateListOfServices();
        this.dialogRef.close();
      });
  }
}
