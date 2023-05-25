import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'menu/:id',
        loadChildren: () =>
          import('./../menu-container/menu-container.module').then(
            (m) => m.MenuContainerModule
          ),
      },
      {
        path: 'role',
        loadChildren: () =>
          import('./../role/role.module').then((m) => m.RoleModule),
      },
      {
        path: 'service',
        loadChildren: () =>
          import('./../service/service.module').then((m) => m.ServiceModule),
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./../form/form.module').then((m) => m.FormModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
