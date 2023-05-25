import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysFormComponent } from './sys-form.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SysFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    SysFormComponent
  ]
})
export class SysFormModule { }
