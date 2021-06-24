import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterClientComponent } from './register-client/register-client.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ClientRequestAddComponent } from './client-request-add/client-request-add.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { MainClientComponent } from './main-client/main-client.component';

const routes: Routes = [
  { path: '',redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register-client', component: RegisterClientComponent },
  { path: 'user-add', component: UserAddComponent},
  { path: 'client-request-add', component: ClientRequestAddComponent},
  { path: 'main-client', component: MainClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
