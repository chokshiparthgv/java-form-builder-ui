export interface IFormFields {
  dataType: string;
  defaultValue?: string;
  displayName: string;
  displayOrder: number;
  fieldTemplateSet: [];
  id: string;
  name: string;
  placeholder?: string;
  regex?: string;
  required: boolean;
  type: string;
}

export interface IFormFields1 {
  id: string;
  name: string;
  type: string;
  displayOrder: number;
  placeholder: string | null;
  defaultValue: string | number | null;
  required: boolean;
  regex: string | null;
  fields: IFormFields1[];
  valueList: any[] | null;
}

export interface IForm {
  description: string;
  fields: IFormFields[];
  id: string;
  name: string;
}
