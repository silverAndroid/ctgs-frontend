import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";
import {Constants} from "../constants";

@Component({
  selector: 'app-register',
  templateUrl: 'templates/register.component.html',
  styleUrls: ['stylesheets/register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User('', '', 'supervisor', '', '');
  active = true;
  roles = Constants.CONST_ROLES;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
      this.roles.splice(2, 1);
  }

  register() {
    this.active = false;
    this._userService.register(this.user).subscribe((res) => {
      if (!res.err) {
        this._router.navigate(['/login']);
      }
    });
    setTimeout(() => this.active = true, 0);
  }
}
