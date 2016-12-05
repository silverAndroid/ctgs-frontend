import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Constants} from "../constants";

@Component({
  selector: 'app-login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['stylesheets/login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '', 'supervisor');
  active = true;
  roles = Constants.CONST_ROLES;

  constructor(private _userService: UserService, private _router: Router) {}

  ngOnInit() {
  }

  login() {
    this.active = false;
    this._userService.login(this.user).subscribe((res) => {
      if (!res.err) {
        this._router.navigate(['']);
      }
    });
    setTimeout(() => this.active = true, 0);
  }

}
