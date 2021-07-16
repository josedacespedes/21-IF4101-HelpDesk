import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/components/Issue/list/list.component';
import { SupportComponent } from './components/components/support/support.component';
import { DetailsComponent } from './components/components/Issue/details/details.component';
import { LoginComponent } from './components/components/login/login.component';
import { MainSupportComponent } from './components/main-support/main-support.component';



const routes: Routes = [
  { path: '', redirectTo: 'Issue', pathMatch: 'full' },
  { path: 'Issue', component: ListComponent },
  { path: 'CreateSupport', component: SupportComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'main/support', component: MainSupportComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
