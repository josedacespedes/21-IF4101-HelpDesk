import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/user/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterClientComponent } from './components/user/register-client/register-client.component';
import { HeaderRegisterComponent } from './components/menu-navbar/header-register/header-register.component';
import { UserAddComponent } from './components/user/user-add/user-add.component';
import { ClientRequestAddComponent } from './components/issue/client-request-add/client-request-add.component';
import { HeaderClientComponent } from './components/menu-navbar/header-client/header-client.component';
import { HeaderUserComponent } from './components/menu-navbar/header-user/header-user.component';
import { MainClientComponent } from './components/issue/main-client/main-client.component';
import { MainUserComponent } from './components/issue/main-user/main-user.component';
import { UserAssignSupportComponent } from './components/issue/user-assign-support/user-assign-support.component';
import { UserListRequestComponent } from './components/issue/user-list-request/user-list-request.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    RegisterClientComponent,
    HeaderRegisterComponent,
    UserAddComponent,
    ClientRequestAddComponent,
    HeaderClientComponent,
    HeaderUserComponent,
    MainClientComponent,
    MainUserComponent,
    UserAssignSupportComponent,
    UserListRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
