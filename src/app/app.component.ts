import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup ,AbstractControl,Validators,ValidationErrors} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  newForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.newForm = this.fb.group({});
  }

  ngOnInit(): void {
    console.log('response:', this.response);
    this.sortResponseModal();
    let fields = this.response.fieldTemplateSet;
    if (Array.isArray(fields)) {
      fields.forEach((item, index) => {
        this.createFormFields(item.type, item);
      });
    }
  }

  


  newFormControl(validators?: ((control: AbstractControl) => ValidationErrors | null)[] | null): FormControl {
    return new FormControl('', validators);
  }


  getFormArray(controlName: string): FormArray {
    return this.newForm.get(controlName) as FormArray;
  }

  
  // newLevelField(fieldArray: any) {
  //   const obj: { [key: string]: any } = {};
  //   fieldArray.forEach((item: { name: string }) => {
  //     const name: string = item.name;
  //     obj[name] = this.newFormControl();
  //   });
  //   return this.fb.group(obj);
  // }
  
  createFormGroup(fieldArray: any): FormGroup {
    const group: { [key: string]: any } = {};
    fieldArray.forEach((item: any) => {
      if (item.type === 'GroupOffieldTemplateSet') {
        group[item.name] = this.createFormGroup(item.fieldTemplateSet);
        console.log(item.name)
      } else {
        group[item.name] = this.newFormControl();

      }
    });
    return this.fb.group(group);
  }
  
  createFormFields(type: string, element: any) {
    switch (type) {
      case 'groupOfRadio':
        this.newForm.addControl(element.name, this.newFormControl());
        break;
  
      case 'MultiSelect':
        this.newForm.addControl(element.name, this.newFormControl());
        break;
  
      case 'GroupOffieldTemplateSet':
        this.newForm.addControl(element.name, this.createFormGroup(element.fieldTemplateSet));
        break;
  
      
      default:
        const validators = element.required ? [Validators.required] : [];
        this.newForm.addControl(element.name, this.newFormControl(validators));
        break;
    }
  }
  
 

  submitForm() {
    console.log('values', this.newForm.getRawValue());
  }

  sortResponseModal() {
    const iterate = (obj: any) => {
      const stack = [obj];
      while (stack?.length > 0) {
        const currentObj = stack.pop();
        Object.keys(currentObj).forEach((key) => {
          if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
            if (Array.isArray(currentObj[key]) && currentObj[key].length > 0) {
              currentObj[key].sort(
                (a: { displayOrder: number }, b: { displayOrder: number }) =>
                  a.displayOrder - b.displayOrder
              );
              console.log(`Array =`, currentObj[key]);
            }
            stack.push(currentObj[key]);
          }
        });
      }
    };
    iterate(this.response);
  }

  response = {
    id: '892a816c-d6ec-407c-b506-d644c29bce90',
    name: 'Form 1',
    description: 'This is form Description',
    fieldTemplateSet: [
      {
        id: 'adbb9fcb-3085-4cd0-96f5-3af42ae5a366',
        name: 'middle name',
        type: 'input',
        displayOrder: 2,
        placeholder: null,
        defaultValue: '',
        required: true,
        regex: '',
        fieldTemplateSet: [],
        values: null,
      },
      {
        id: 'd75fd021-2fa8-4bed-ba6a-507a3edc0515',
        name: 'age',
        type: 'number',
        displayOrder: 4,
        placeholder: null,
        defaultValue: '',
        required: true,
        regex: '',
        fieldTemplateSet: [],
        values: null,
      },
      {
        id: '61e2f97c-4e7d-42e8-9244-ddbf0b505110',
        name: 'gender',
        type: 'groupOfRadio',
        displayOrder: 6,
        placeholder: null,
        defaultValue: 'male',
        required: false,
        regex: null,
        fieldTemplateSet: [
          {
            id: 'e68c948e-09d3-40b7-be20-4948dffab794',
            name: 'female',
            type: 'radio',
            displayOrder: 2,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
          {
            id: '401808e4-7a04-45e0-a5a4-f366cd98ba05',
            name: 'male',
            type: 'radio',
            displayOrder: 1,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
        ],
        values: null,
      },
      {
        id: '61cb7393-54af-4a59-ba8d-47c66bd5c595',
        name: 'last name',
        type: 'input',
        displayOrder: 3,
        placeholder: null,
        defaultValue: '',
        required: true,
        regex: '',
        fieldTemplateSet: [],
        values: null,
      },
      {
        id: '7f4e2caa-b727-4278-9b7b-7f5d8a5ae3ff',
        name: 'first name',
        type: 'input',
        displayOrder: 1,
        placeholder: null,
        defaultValue: '',
        required: true,
        regex: '',
        fieldTemplateSet: [],
        values: null,
      },
      {
        id: 'c2302e4e-444e-49ca-a34d-edfe75139986',
        name: 'hobbies',
        type: 'MultiSelect',
        displayOrder: 6,
        placeholder: null,
        defaultValue: '',
        required: false,
        regex: '',
        fieldTemplateSet: [
          {
            id: 'e47b99c2-53da-456c-8387-d843715d83d3',
            name: 'Carrom',
            type: 'option',
            displayOrder: 2,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
          {
            id: '39b0dfe4-ded3-49a1-9711-dbf406f01e94',
            name: 'Cicket',
            type: 'option',
            displayOrder: 1,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
          {
            id: 'bef968cf-93c0-4b82-b7b7-c05fff43eda4',
            name: 'football',
            type: 'option',
            displayOrder: 3,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
          {
            id: '12bc869e-4f36-4387-8f39-6eb3a9deb463',
            name: 'tabletennis',
            type: 'option',
            displayOrder: 4,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [],
            values: null,
          },
        ],
        values: null,
      },
      {
        id: '3787e71f-59da-403a-93b6-44a1fc3ecdd2',
        name: 'FamilyDetails',
        type: 'GroupOffieldTemplateSet',
        displayOrder: 7,
        placeholder: null,
        defaultValue: '',
        required: false,
        regex: '',
        fieldTemplateSet: [
          {
            id: '2afb5631-9da8-4ad6-a76b-ffc58d83f46c',
            name: 'secondLevel',
            type: 'GroupOffieldTemplateSet',
            displayOrder: 2,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [
              {
                id: '372e160e-4e32-411b-809a-b84d2698c9d3',
                name: 'last name',
                type: 'input',
                displayOrder: 2,
                placeholder: null,
                defaultValue: '',
                required: false,
                regex: '',
                fieldTemplateSet: [],
                values: null,
              },
              {
                id: '36c05f87-1ea3-478a-9734-be346db5096b',
                name: 'first name',
                type: 'input',
                displayOrder: 1,
                placeholder: null,
                defaultValue: '',
                required: true,
                regex: '',
                fieldTemplateSet: [],
                values: null,
              },
            ],
            values: null,
          },
          {
            id: '3f76e511-5300-4a12-b10c-6c53280abb3f',
            name: 'firstLevel',
            type: 'GroupOffieldTemplateSet',
            displayOrder: 1,
            placeholder: null,
            defaultValue: '',
            required: false,
            regex: '',
            fieldTemplateSet: [
              {
                id: '0b8f995c-8e31-4573-9add-eeb13bd4f4f0',
                name: 'last name',
                type: 'input',
                displayOrder: 2,
                placeholder: null,
                defaultValue: '',
                required: false,
                regex: '',
                fieldTemplateSet: [],
                values: null,
              },
              {
                id: 'ca8da647-c74c-4a0b-abe0-32b7268135d1',
                name: 'first name',
                type: 'input',
                displayOrder: 1,
                placeholder: null,
                defaultValue: '',
                required: true,
                regex: '',
                fieldTemplateSet: [],
                values: null,
              },
            ],
            values: null,
          },
        ],
        values: null,
      },
      {
        id: 'c01984f8-8935-4991-9c82-ee9ad4c54166',
        name: 'password',
        type: 'password',
        displayOrder: 5,
        placeholder: null,
        defaultValue: '',
        required: true,
        regex: '',
        fieldTemplateSet: [],
        values: null,
      },
    ],
  };
}
