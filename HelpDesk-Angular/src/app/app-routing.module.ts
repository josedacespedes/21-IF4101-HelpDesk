import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { UserAddComponent } from './user-add/user-add.component';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'user-add', component: UserAddComponent, data: { title: 'User add' }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
