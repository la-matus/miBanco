import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserFormComponent} from './components/user-form/user-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { LoginComponent } from './components/login/login.component';
const routes: Routes = [
  {
    path:'',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'dashboard',
    component: DashboardComponent
  },{
    path:'dashboard/add',
    component: UserFormComponent
  },{
    path:'account',
    component: UserAccountComponent
  },{
    path:'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
