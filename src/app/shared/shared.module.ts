import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from './forms/forms.module';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ErrorComponent,
    HeaderComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HeaderComponent,
    FormsModule
  ]
})
export class SharedModule { }
