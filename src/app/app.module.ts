import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

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
import { RegisterComponent } from './components/register.component';
import { StudentApplicationComponent } from './components/student-application.component';
import { NewStudentApplicationComponent } from './components/new-student-application.component';
import { MdAutocomplete } from "./components/md-autocomplete.component";
import { GoogleMapsService } from "./services/google-maps.service";
import { MoneyValidatorDirective } from './directives/money-validator.directive';
import { DateTimeValidatorDirective } from './directives/date-time-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MdAutocomplete,
    NewStudentApplicationComponent,
    RegisterComponent,
    StudentApplicationComponent,
    MoneyValidatorDirective,
    DateTimeValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [AdminGuard, ApplicationService, AlertsService, CookieService, GoogleMapsService, LoggedInGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
