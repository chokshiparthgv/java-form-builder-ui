export interface ISubField {
  id: string,
  value: string
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
  values: ISubField[];
  status: boolean;
}

export interface IForm {
  description: string;
  fields: IFormFields1[];
  id: string;
  name: string;
}
