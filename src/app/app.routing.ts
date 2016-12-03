/**
 * Created by silver_android on 28/11/16.
 */
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {LoginComponent} from "./components/login.component";
import {LoggedInGuard} from "./logged-in.guard";
import {RegisterComponent} from "./components/register.component";
import {NewStudentApplicationComponent} from "./components/new-student-application.component";

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'applications/new', component: NewStudentApplicationComponent, canActivate: [LoggedInGuard]}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
