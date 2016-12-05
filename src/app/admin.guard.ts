import {Router, CanActivate} from "@angular/router";
import {UserService} from "./services/user.service";
import {Injectable} from "@angular/core";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {HTTPConnection} from "./services/http.connection";
/**
 * Created by silver_android on 05/12/16.
 */
@Injectable()
export class AdminGuard implements CanActivate {

  currentRole : string = HTTPConnection.getRole(this._cookieService);

  constructor(private user: UserService, private _cookieService: CookieService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.user.isLoggedIn() || this.currentRole != 'admin') {
      this.router.navigate(['/login']);
    }
    return this.user.isLoggedIn() && this.currentRole == 'admin';
  }
}
