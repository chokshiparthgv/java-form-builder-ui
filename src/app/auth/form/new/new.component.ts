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
      // if (serviceInfo.form) {
      // } else {
        this.genericForm = new FormGroup({
          name: new FormControl('', Validators.required),
          description: new FormControl('', Validators.required),
          fields: this.fb.array([]),
        });
      // }
      this.isLoading = false;
    });
  }

  private generateForm(formInfo: IFormFields1) {}

  saveGenericForm() {
    this.genericForm.disable();
    this.genericFormServiceProvider
      .addNewForm(this.genericForm.value)
      .subscribe((response) => {
        this.formServiceProvider
          .assignFormToService(this.serviceId, response.id)
          .subscribe(() => {
            this.notificationServiceProvider.addNewNotification({
              name: 'New form added!',
              isReadByUser: false,
              redirectionUrl: 'navigateToFormList',
            });
            this.navigationServiceProvider.navigateToServiceList();
          });
      });
  }

  get fields() {
    return this.genericForm.get('fields') as FormArray;
  }

  getSubFields(id: number) {
    return this.fields.at(id).get('fields') as FormArray;
  }

  private textFieldMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      placeholder: new FormControl(''),
      regex: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
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
      type: new FormControl(TYPES[1].key),
    });
  }

  private dateFieldMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      type: new FormControl(TYPES[2].key),
    });
  }

  private checkBoxMetaInfoForm() {
    return this.fb.group({
      name: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
      fields: new FormArray([this.textFieldMetaInfoForm()]),
      type: new FormControl(TYPES[4].key),
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
        this.fields.push(this.checkBoxMetaInfoForm());
        break;
      case 'RADIO':
        this.fields.push(this.checkBoxMetaInfoForm());
        break;
      case 'DROPDOWN':
        this.fields.push(this.checkBoxMetaInfoForm());
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
