import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { NewComponent } from './new/new.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AssignFormComponent } from './assign-form/assign-form.component';

@NgModule({
  declarations: [
    ServiceComponent,
    NewComponent,
    ListComponent,
    AssignFormComponent,
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class ServiceModule {}
