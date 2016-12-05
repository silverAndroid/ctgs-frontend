import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Ng2SelectModule } from "ng2-material-select/dist/src/ng2-select.module";

import { CookieService } from "angular2-cookie/services/cookies.service";
import { LoggedInGuard } from "./logged-in.guard";
import { UserService } from "./services/user.service";
import { ApplicationService } from "./services/application.service";
import { AlertsService } from "./services/alerts.service";

import { routing } from "./app.routing";

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';
import { StudentApplicationComponent } from './components/student-application.component';
import { NewStudentApplicationComponent } from './components/new-student-application.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NewStudentApplicationComponent,
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
  providers: [ApplicationService, AlertsService, CookieService, LoggedInGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
