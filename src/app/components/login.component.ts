import {Component, OnInit} from "@angular/core";
import {User} from "../models/user.model";
import {Router} from "@angular/router";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: 'templates/login.component.html',
  styleUrls: ['stylesheets/login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '');
  active = true;

  constructor(private _userService: UserService, private _router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.active = false;
    this._userService.login(this.user).subscribe((res) => {
      if (res.status == 200) {
        this._router.navigate(['']);
      }
    });
    setTimeout(() => this.active = true, 0);
  }

}
