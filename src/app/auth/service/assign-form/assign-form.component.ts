import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IForm } from 'src/app/core/models/form.model';
import { IAppService } from 'src/app/core/models/permission.model';
import { GenericFormService } from 'src/app/core/services/generic-form/generic-form.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
  selector: 'app-assign-form',
  templateUrl: './assign-form.component.html',
  styleUrls: ['./assign-form.component.css'],
})
export class AssignFormComponent {
  isLoading = false;
  assignServiceForm!: FormGroup;
  listOfServices!: IAppService[];
  listOfForms: IForm[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private menuServiceProvider: MenuService,
    private formServiceProvider: GenericFormService,
    private dialogRef: MatDialogRef<AssignFormComponent>
  ) {
    this.isLoading = true;
    this.assignServiceForm = new FormGroup({
      serviceName: new FormControl('', Validators.required),
    });
    this.formServiceProvider.getAllForms().subscribe((response) => {
      this.listOfForms = response;
    });
    this.menuServiceProvider
      .getListOfServices()
      .subscribe((response: IAppService[]) => {
        this.listOfServices = response;
        this.isLoading = false;
      });
  }
  saveAssignService() {
    const formInfo = this.assignServiceForm.value;
    this.formServiceProvider
      .assignFormToService(this.data.id, formInfo.serviceName.id)
      .subscribe(async (response) => {
        await this.menuServiceProvider.updateListOfServices();
        this.dialogRef.close();
      });
  }
}
