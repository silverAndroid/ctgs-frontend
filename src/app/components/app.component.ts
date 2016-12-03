import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  styleUrls: ['stylesheets/app.component.css']
})
export class AppComponent {
  title = 'Travel Grant Application System';

  constructor(public userService: UserService, private _router: Router) {}

  logout() {
    this.userService.logout();
    this._router.navigate(['/login']);
  }
}
