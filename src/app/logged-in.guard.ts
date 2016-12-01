import {Router, CanActivate} from "@angular/router";
import {UserService} from "./services/user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.user.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.user.isLoggedIn();
  }
}
