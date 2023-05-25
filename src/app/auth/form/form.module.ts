import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignServiceComponent } from './assign-service/assign-service.component';

@NgModule({
  declarations: [FormComponent, ListComponent, NewComponent, AssignServiceComponent],
  imports: [CommonModule, FormRoutingModule, SharedModule, ReactiveFormsModule],
})
export class FormModule {}
