import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterClientComponent } from './register-client/register-client.component';
import { HeaderRegisterComponent } from './header-register/header-register.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ClientRequestAddComponent } from './client-request-add/client-request-add.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { HeaderUserComponent } from './header-user/header-user.component';
import { MainClientComponent } from './main-client/main-client.component';
import { MainUserComponent } from './main-user/main-user.component';
import { UserAssignSupportComponent } from './user-assign-support/user-assign-support.component';



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
    UserAssignSupportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
