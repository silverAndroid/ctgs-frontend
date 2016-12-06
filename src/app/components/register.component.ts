import {Component, OnInit} from "@angular/core";
import {UserService} from "../services/user.service";
import {User} from "../models/user.model";
import {Constants} from "../constants";
import {AlertsService} from "../services/alerts.service";

@Component({
  selector: 'app-register',
  templateUrl: 'templates/register.component.html',
  styleUrls: ['stylesheets/register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = new User('', '', 'supervisor', '', '');
  active = true;
  roles = [];
  supervisors = [];

  constructor(private _userService: UserService, private _snackbar: AlertsService) {
  }

  ngOnInit() {
    this.getSupervisors();
    Constants.CONST_ROLES.forEach((role) => {
      this.roles.push(role);
    });
    this.roles.splice(2, 1);
  }

  register() {
    this.active = false;
    this._userService.register(this.user).subscribe((res) => {
      this._snackbar.showMsg(res.message, false);
    });
    setTimeout(() => this.active = true, 0);
  }

  getSupervisors() {
    this._userService.getSupervisors().subscribe(res => {
      if (!res.err) {
        let supervisors = [];
        res.data.forEach(object => {
          supervisors.push({display: object.username});
        });
        this.supervisors = supervisors;
      }
    })
  }

  getMatches(items: any[], itemText: string, searchText: string) {
    let matches: string[] = [];
    searchText = `(${searchText})`;
    items.forEach(item => {
      if (matches.length <= 5 && item[itemText].match(new RegExp(searchText)))
        matches.push(item)
    });
    return matches;
  }
}
