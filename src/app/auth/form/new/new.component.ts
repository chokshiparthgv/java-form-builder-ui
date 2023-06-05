import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GenericFormService } from 'src/app/core/services/generic-form/generic-form.service';
import { NavigationService } from 'src/app/core/services/navigation/navigation.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TYPES } from './../../../core/helpers/constants';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MenuService } from 'src/app/core/services/menu/menu.service';
import { IFormFields1 } from 'src/app/core/models/form.model';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  genericForm!: FormGroup;
  fieldTitleInfo: string[] = [];
  serviceId: string = '';
  isLoading = true;
  isUpdate = false;
  isHidden = true;
  public fieldTypes = TYPES;

  constructor(
    private fb: FormBuilder,
    private genericFormServiceProvider: GenericFormService,
    public navigationServiceProvider: NavigationService,
    private notificationServiceProvider: NotificationService,
    private activatedRouteServiceProvider: ActivatedRoute,
    private formServiceProvider: GenericFormService,
    private menuServiceProvider: MenuService
  ) {
    this.activatedRouteServiceProvider.params.subscribe(async (params: any) => {
      this.serviceId = params.id;
      const serviceInfo = await firstValueFrom(
        this.menuServiceProvider.getServiceById(this.serviceId)
      );
      this.genericForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        fields: this.fb.array([]),
      });
      if (serviceInfo.form) this.generateForm(serviceInfo.form);
      this.isLoading = false;
    });
  }

  private generateForm(formInfo: IFormFields1) {
    this.isUpdate = true;
    for (let i = 0; i < formInfo.fields.length; i++) {
      const listOfFields = formInfo.fields;
      this.addFieldType(this.fetchFieldType(listOfFields[i].type));
      if (listOfFields[i].fields.length) {
        let subFieldCount = listOfFields[i].fields.length - 1;
        while (subFieldCount) {
          this.addFieldInGroup(i);
          subFieldCount--;
        }
      }
    }
    this.genericForm.patchValue(formInfo);
  }

  saveGenericForm() {
    this.genericForm.disable();
    if (this.isUpdate) {
      this.genericFormServiceProvider
        .updateFormById(this.genericForm.value.id, this.genericForm.value)
        .subscribe(async (response) => {
          this.notificationServiceProvider.addNewNotification({
            name: 'Update form!',
            isReadByUser: false,
            redirectionUrl: 'navigateToFormList',
          });
          await this.menuServiceProvider.updateListOfAllServices();
          this.navigationServiceProvider.navigateToServiceList();
        });
    } else {
      const { id, ...payload } = this.genericForm.value;
      this.genericFormServiceProvider
        .addNewForm(payload)
        .subscribe((response) => {
          this.formServiceProvider
            .assignFormToService(this.serviceId, response.id)
            .subscribe(async () => {
              this.notificationServiceProvider.addNewNotification({
                name: 'New form added!',
                isReadByUser: false,
                redirectionUrl: 'navigateToFormList',
              });
              await this.menuServiceProvider.updateListOfAllServices();
              this.navigationServiceProvider.navigateToServiceList();
            });
        });
    }
  }

  get fields() {
    return this.genericForm.get('fields') as FormArray;
  }

  getSubFields(id: number) {
    return this.fields.at(id).get('fields') as FormArray;
  }

  private fetchFieldType(type: string) {
    return this.fieldTypes.filter((f) => f.key == type)[0];
  }

  private textFieldMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      placeholder: new FormControl(''),
      regex: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      status: new FormControl('ACTIVE'),
      type: new FormControl(TYPES[0].key),
    });
  }

  private numFieldMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(0),
      placeholder: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      status: new FormControl('ACTIVE'),
      type: new FormControl(TYPES[1].key),
    });
  }

  private dateFieldMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      status: new FormControl('ACTIVE'),
      type: new FormControl(TYPES[2].key),
    });
  }

  private checkBoxMetaInfoForm(typeNumber: number) {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      fields: new FormArray([this.textFieldMetaInfoForm()]),
      status: new FormControl('ACTIVE'),
      type: new FormControl(TYPES[typeNumber].key),
    });
  }

  newField() {
    return this.fb.group({
      displayOrder: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      displayName: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      dataType: new FormControl('', Validators.required),
      required: new FormControl('', Validators.required),
      status: new FormControl('ACTIVE'),
      value: new FormControl('', Validators.required),
    });
  }

  addField() {
    this.fields.push(this.newField());
  }

  addFieldInGroup(id: number) {
    (this.fields.at(id).get('fields') as FormArray).push(
      this.textFieldMetaInfoForm()
    );
  }

  addFieldType(fieldType: any) {
    switch (fieldType.key) {
      case 'TEXT':
        this.fields.push(this.textFieldMetaInfoForm());
        break;
      case 'NUMBER':
        this.fields.push(this.numFieldMetaInfoForm());
        break;
      case 'DATE':
        this.fields.push(this.dateFieldMetaInfoForm());
        break;
      case 'CHECKBOX':
        this.fields.push(this.checkBoxMetaInfoForm(4));
        break;
      case 'RADIO':
        this.fields.push(this.checkBoxMetaInfoForm(5));
        break;
      case 'DROPDOWN':
        this.fields.push(this.checkBoxMetaInfoForm(3));
        break;
      default:
        this.newField();
        break;
    }
    this.fieldTitleInfo.push(fieldType.label);
  }

  controlsKey(formGroup: any) {
    return Object.keys(formGroup.controls);
  }

  removeField(i: number) {
    this.fields.removeAt(i);
    this.fieldTitleInfo.splice(i, 1);
  }
}
