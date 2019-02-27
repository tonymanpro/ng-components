import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PermisionComponent } from 'projects/ng-components/src/lib/permision.component';
import { DetailComponent } from './dashboard/detail/detail.component';
import { EditComponent } from './dashboard/edit/edit.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [PermisionComponent],
    children: [
      {
        path: '',
        canActivateChild: [ PermisionComponent ],
        children: [
          { path: 'detail', component: DetailComponent },
          { path: 'edit', component: EditComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // { enableTracing: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
