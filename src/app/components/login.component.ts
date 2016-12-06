import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Constants} from "../constants";
import {AlertsService} from "../services/alerts.service";

@Component({
  selector: 'app-login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['stylesheets/login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '', 'supervisor');
  active = true;
  roles = [];

  constructor(private _userService: UserService, private _router: Router, private _snackbar: AlertsService) {}

  ngOnInit() {
    Constants.CONST_ROLES.forEach((role) => {
      this.roles.push(role);
    });
  }

  login() {
    this.active = false;
    this._userService.login(this.user).subscribe((res) => {
      if (!res.err) {
        this._router.navigate(['']);
      }
      this._snackbar.showMsg(res.message, false);
    });
    setTimeout(() => this.active = true, 0);
  }

}
