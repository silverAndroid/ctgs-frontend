import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CookieService } from "angular2-cookie/services/cookies.service";
import { LoggedInGuard } from "./logged-in.guard";
import { UserService } from "./services/user.service";

import { routing } from "./app.routing";

import { AppComponent } from './components/app.component';
import { MaterialModule } from '@angular/material';
import { LoginComponent } from './components/login.component';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';
import { StudentApplicationComponent } from './components/student-application.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    StudentApplicationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    routing
  ],
  providers: [CookieService, LoggedInGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
