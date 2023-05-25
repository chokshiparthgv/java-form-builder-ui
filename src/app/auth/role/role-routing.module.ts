import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { RoleComponent } from './role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
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
export class RoleRoutingModule {}
