import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AccessRightsComponent } from './access-rights/access-rights.component';


@NgModule({
  declarations: [
    RoleComponent,
    ListComponent,
    NewComponent,
    AccessRightsComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RoleModule { }
