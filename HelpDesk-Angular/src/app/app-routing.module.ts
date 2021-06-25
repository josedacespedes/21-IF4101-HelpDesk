import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ClientRequestAddComponent } from './client-request-add/client-request-add.component';
import { MainClientComponent } from './main-client/main-client.component';
import { MainUserComponent } from './main-user/main-user.component';
import { UserAssignSupportComponent } from './user-assign-support/user-assign-support.component';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'main-client', component: MainClientComponent},
  { path: 'client-request-add', component: ClientRequestAddComponent},
  { path: 'main-user', component: MainUserComponent},
  { path: 'user-add', component: UserAddComponent},
  { path: 'user-assign-support', component: UserAssignSupportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
