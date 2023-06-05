import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IForm, IFormFields1, ISubField } from 'src/app/core/models/form.model';
import { IAppService } from 'src/app/core/models/permission.model';
import { GenericFormService } from 'src/app/core/services/generic-form/generic-form.service';
import { MenuService } from 'src/app/core/services/menu/menu.service';

@Component({
  selector: 'app-sys-form',
  templateUrl: './sys-form.component.html',
  styleUrls: ['./sys-form.component.css'],
})
export class SysFormComponent {
  public currentMenuInfo!: IAppService;
  public currentFormMenu!: FormGroup;
  private fieldDetails!: IFormFields1[];

  isLoading = true;

  constructor(
    private menuServiceProvider: MenuService,
    private genericFormServiceProvider: GenericFormService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.isLoading = true;
      this.currentMenuInfo = this.menuServiceProvider.currentMenu$.getValue();
      if (this.currentMenuInfo) {
        this.genericFormServiceProvider
          .getGenericFormByVisitId(this.currentMenuInfo.form?.id as string)
          .subscribe((response: IForm) => {
            if (response) {
              this.fieldDetails = response.fields;
              response.fields.sort(
                (a: IFormFields1, b: IFormFields1) =>
                  a.displayOrder - b.displayOrder
              );
              this.currentFormMenu = new FormGroup(
                this.generateForm(response.fields)
              );
              if (
                this.currentMenuInfo.permission &&
                this.currentMenuInfo.permission.includes('VIEW')
              ) {
                this.currentFormMenu.disable();
              }
              this.currentFormMenu.markAsPristine();
              this.isLoading = false;
            }
          });
      }
    });
  }

  private generateForm(fields: IFormFields1[]) {
    let listOfFields: any = {};
    fields.forEach((field) => {
      let fc;
      if(field.type == 'CHECKBOX'){ 
        fc = new FormControl(field.fields.filter(f => f.values));
      } else {
        fc = new FormControl('');
        if(field.values) fc.setValue(field.values[0].value);
      };
      if (field.required) fc.addValidators(Validators.required);
      listOfFields[field.id] = fc;
    });
    return listOfFields;
  }

  private generatePayload() {
    const requestBody: any[] = [];
    this.fieldDetails.forEach((field) => {
      const control = this.currentFormMenu.get(field.id);
      if(Array.isArray(control?.value)) {
        control?.value.forEach(val => {
          requestBody.push({
            id: field.values ? field.values[0].id : '',
            fieldTemplateId: val.id,
            value: true
          });
        });
      } else {
        requestBody.push({
          id: field.values ? field.values[0].id : '',
          fieldTemplateId: field.id,
          value: control?.value,
        });
      }
    });
    return requestBody;
  }

  submitForm() {
    const payload = this.generatePayload();
    this.currentFormMenu.disable();
    this.genericFormServiceProvider
      .submitGenericForm(this.currentMenuInfo.form?.id as string, payload)
      .subscribe(() => {
        this.currentFormMenu.enable();
      });
  }
}
