import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { ENDPOINTS } from '../../helpers/constants';
import { IFormFields1 } from '../../models/form.model';

@Injectable({
  providedIn: 'root',
})
export class GenericFormService {
  constructor(private apiServiceProvider: ApiService) {}

  addNewForm(formInfo: any) {
    return this.apiServiceProvider.postApi(
      this.apiServiceProvider.apiUri + ENDPOINTS.FORM,
      formInfo
    );
  }

  getAllForms() {
    return this.apiServiceProvider.getApi(
      this.apiServiceProvider.apiUri + ENDPOINTS.FORM
    );
  }

  assignFormToService(serviceId: string, formId: string) {
    return this.apiServiceProvider.putApi(
      this.apiServiceProvider.apiUri +
        ENDPOINTS.ASSIGN_FORM_IN_SERVICE.replace(
          ':serviceId',
          serviceId
        ).replace(':formId', formId)
    );
  }

  updateFormById(formId: string, payload: IFormFields1) {
    return this.apiServiceProvider.putApi(
      this.apiServiceProvider.apiUri + ENDPOINTS.FORM + '/' + formId,
      payload
    );
  }

  submitGenericForm(formId: string, payload: any[]) {
    return this.apiServiceProvider.putApi(
      this.apiServiceProvider.apiUri +
        ENDPOINTS.SUBMIT_GENERIC_FORM.replace(':formId', formId),
      payload
    );
  }

  getGenericFormByVisitId(formId: string) {
    return this.apiServiceProvider.getApi(
      this.apiServiceProvider.apiUri +
        ENDPOINTS.SUBMIT_GENERIC_FORM.replace(':formId', formId)
    );
  }
}
