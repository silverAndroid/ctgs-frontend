import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Ng2SelectModule } from "ng2-material-select/dist/src/ng2-select.module";

import { AdminGuard } from "./admin.guard";
import { CookieService } from "angular2-cookie/services/cookies.service";
import { LoggedInGuard } from "./logged-in.guard";
import { UserService } from "./services/user.service";
import { ApplicationService } from "./services/application.service";
import { AlertsService } from "./services/alerts.service";

import { routing } from "./app.routing";

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { PolymerElement } from "@vaadin/angular2-polymer";
import { RegisterComponent } from './components/register.component';
import { StudentApplicationComponent } from './components/student-application.component';
import { NewStudentApplicationComponent } from './components/new-student-application.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewStudentApplicationComponent,
    PolymerElement('paper-dropdown-menu'),
    PolymerElement('paper-listbox'),
    PolymerElement('paper-item'),
    RegisterComponent,
    StudentApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    Ng2SelectModule,
    routing
  ],
  providers: [AdminGuard, ApplicationService, AlertsService, CookieService, LoggedInGuard, UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
