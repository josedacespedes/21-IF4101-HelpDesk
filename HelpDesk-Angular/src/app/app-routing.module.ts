import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterClientComponent } from './components/user/register-client/register-client.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { ClientRequestAddComponent } from './components/issue/client-request-add/client-request-add.component';
import { ClientRequestListComponent } from './components/issue/client-request-list/client-request-list.component';
import { MainClientComponent } from './components/issue/main-client/main-client.component';
import { MainUserComponent } from './components/issue/main-user/main-user.component';
import { UserAssignSupportComponent } from './components/issue/user-assign-support/user-assign-support.component';
import { UserListRequestComponent } from './components/issue/user-list-request/user-list-request.component';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'main-client', component: MainClientComponent},
  { path: 'client-request-add', component: ClientRequestAddComponent},
  { path: 'client-request-list', component: ClientRequestListComponent },
  { path: 'main-user', component: MainUserComponent},
  { path: 'user-add', component: UserAddComponent},
  { path: 'user-assign-support', component: UserAssignSupportComponent},
  { path: 'user-list-request', component: UserListRequestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
