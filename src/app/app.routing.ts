/**
 * Created by silver_android on 28/11/16.
 */
import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {HomeComponent} from "./components/home.component";
import {LoginComponent} from "./components/login.component";
import {LoggedInGuard} from "./logged-in.guard";
import {RegisterComponent} from "./components/register.component";

const routes: Routes = [{path: '', component: HomeComponent, canActivate: [LoggedInGuard]},
  {path: 'login', component: LoginComponent}, {path: 'register', component: RegisterComponent}];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
