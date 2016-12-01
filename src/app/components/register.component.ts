import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";
import { User } from "../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: 'templates/register.component.html',
  styleUrls: ['stylesheets/register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User("", "");
  active = true;

  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() { }

  register() {
    this.active = false;
    this._userService.register(this.user).subscribe((res) => {
      if (res.status == 200) {
        this._router.navigate(['/login']);
      }
    });
    setTimeout(() => this.active = true, 0);
  }
}
