/**
 * Created by silve on 2016-08-07.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/core";
import {HTTPConnection} from "./http.connection";
import {Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UserService {

  private loggedIn : boolean = true;

  constructor(private _http: Http, private _cookieService: CookieService) {
    this.loggedIn = !HTTPConnection.getToken(_cookieService) || Boolean(HTTPConnection.getToken(_cookieService));
  }

  login(user: User) : Observable<LoginModel> {
    return this._http.post('/users/login', {username: user.username, password: user.password})
      .map(HTTPConnection.extractData)
      .map((res) => {
        if (res['status'] == 200) {
          HTTPConnection.saveToken('true', this._cookieService);
        }
        this.loggedIn = true;
        return res;
      })
      .catch(HTTPConnection.handleError);
  }

  register(user: User) : Observable<RegisterModel> {
    return this._http.post('/users/register', {name: user.givenNames + " " + user.surname, username: user.username, password: user.password})
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  logout() {
    HTTPConnection.deleteToken(this._cookieService);
    this.loggedIn = false;
  }

  isLoggedIn() : boolean {
    return this.loggedIn;
  }
}

class LoginModel {
  constructor(public status: number, public error: string, public token?: string) {
  }
}

class RegisterModel {
  constructor(public status: number, public error?: string) {
  }
}
