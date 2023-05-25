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
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
})
export class NewComponent {
  genericForm!: FormGroup;
  fieldTitleInfo: string[] = [];
  public fieldTypes = TYPES;
  constructor(
    private fb: FormBuilder,
    private genericFormServiceProvider: GenericFormService,
    public navigationServiceProvider: NavigationService,
    private notificationServiceProvider: NotificationService
  ) {
    this.genericForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      fields: this.fb.array([]),
    });
  }

  saveGenericForm() {
    this.genericFormServiceProvider
      .addNewForm(this.genericForm.value)
      .subscribe((response) => {
        this.notificationServiceProvider.addNewNotification({
          name: 'New form added!',
          isReadByUser: false,
          redirectionUrl: 'navigateToFormList',
        });
        this.navigationServiceProvider.navigateToFormList();
      });
  }

  get fields() {
    return this.genericForm.get('fields') as FormArray;
  }

  private textFieldMetaInfoForm() {
    return this.fb.group({
      displayName: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      placeholder: new FormControl(''),
      regex: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
    });
  }

  private numFieldMetaInfoForm() {
    return this.fb.group({
      displayName: new FormControl('', Validators.required),
      defaultValue: new FormControl(0),
      placeholder: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
    });
  }

  private dateFieldMetaInfoForm() {
    return this.fb.group({
      displayName: new FormControl('', Validators.required),
      defaultValue: new FormControl(''),
      required: new FormControl(false),
      displayOrder: new FormControl(1),
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

  addFieldType(fieldType: any) {
    switch (fieldType.key) {
      case 'TEXT':
        this.fields.push(this.textFieldMetaInfoForm());
        this.fieldTitleInfo.push(fieldType.label);
        break;
      case 'NUMBER':
        this.fields.push(this.numFieldMetaInfoForm());
        this.fieldTitleInfo.push(fieldType.label);
        break;
      case 'DATE':
        this.fields.push(this.dateFieldMetaInfoForm());
        this.fieldTitleInfo.push(fieldType.label);
        break;
      default:
        this.newField();
        break;
    }
  }

  controlsKey(formGroup: any) {
    return Object.keys(formGroup.controls);
  }

  removeField(i: number) {
    this.fields.removeAt(i);
    this.fieldTitleInfo.splice(i, 1);
  }
}
