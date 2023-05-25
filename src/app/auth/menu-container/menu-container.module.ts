import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuContainerComponent } from './menu-container.component';
import { MenuContainerRoutingModule } from './menu-container-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    MenuContainerComponent
  ],
  imports: [
    CommonModule,
    MenuContainerRoutingModule,
    SharedModule
  ]
})
export class MenuContainerModule { 
}
