import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import {FormUserComponent} from "./components/user/form-user/form-user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormIssueComponent} from "./components/issue/form-issue/form-issue.component";
import {LoginComponent} from "./components/user/login/login.component";
import {HttpInterceptorService} from "../services/http-interceptor.service";
import {ListIssueComponent} from "./components/issue/list-issue/list-issue.component";
import { ListCommentComponent } from './components/comment/list-comment/list-comment.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    FormUserComponent,
    FormIssueComponent,
    LoginComponent,
    ListIssueComponent,
    ListCommentComponent,
    NavMenuComponent
  ],
    imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule,
      ReactiveFormsModule,
      HttpClientModule,
      RouterModule.forRoot([
        { path: '', redirectTo: 'issue/list', pathMatch: 'full' },
        {path: 'login', component: LoginComponent},
        {path: 'register', component: FormUserComponent},
        {path: 'issue/register', component: FormIssueComponent},
        {path: 'issue/list', component: ListIssueComponent},
        {path: 'comment/list/:reportNumber', component: ListCommentComponent}
      ]),
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
