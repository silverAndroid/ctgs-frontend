import {Component} from "@angular/core";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {HTTPConnection} from "../services/http.connection";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Component({
  selector: 'app-root',
  templateUrl: 'templates/app.component.html',
  styleUrls: ['stylesheets/app.component.css']
})
export class AppComponent {
  title = 'Travel Grant Application System';
  currentRole = HTTPConnection.getRole(this._cookieService);

  constructor(public userService: UserService, private _router: Router, private _cookieService: CookieService) {}

  logout() {
    this.userService.logout();
    this._router.navigate(['/login']);
  }
}
