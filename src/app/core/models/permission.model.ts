export interface IFields {
  dataType: string;
  defaultValue?: string;
  displayName: string;
  displayOrder: number;
  fields: [];
  id: string;
  name: string;
  placeholder?: string;
  regex?: string;
  required: true;
  type: string;
  valueList?: string[];
}

export interface AppFormInfo {
  id: string;
  name: string;
  description: string;
  aggregationType: string;
  fields: IFields[];
}

export interface IAppService {
  id: string;
  name: string;
  form?: AppFormInfo;
  permission: string[];
}
