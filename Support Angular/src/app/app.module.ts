import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ListComponent } from './components/components/Issue/list/list.component';


import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SupportComponent } from './components/components/support/support.component';
import { DetailsComponent } from './components/components/Issue/details/details.component';
import { LoginComponent } from './components/components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainSupportComponent } from './components/main-support/main-support.component';


@NgModule({
  declarations: [
    AppComponent,
    ListComponent, SupportComponent, DetailsComponent, LoginComponent, NavMainComponent, NavMenuComponent, MainSupportComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
