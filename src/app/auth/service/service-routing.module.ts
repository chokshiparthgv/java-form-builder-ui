import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceComponent } from './service.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'new',
        component: NewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
