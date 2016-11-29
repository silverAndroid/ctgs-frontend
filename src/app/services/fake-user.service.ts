/**
 * Created by silver_android on 28/11/16.
 */
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

  private loggedIn = false;
  private users : User[] = [{username: 'rushil', password: 'hello'}, {username: 'koosoku', password: 'kylie'}];

  constructor(private _http: Http, private _cookieService: CookieService) {
    this.loggedIn = !!HTTPConnection.getToken(_cookieService);
  }

  login(user: User) : Observable<LoginModel> {
    let response : LoginModel = null;
    this.users.forEach(fakeUser => {
      if (user.username == fakeUser.username) {
        if (user.password == fakeUser.password) {
          response = new LoginModel(200, "", Guid.newGuid());
        } else {
          response = new LoginModel(401, "Incorrect username and/or password");
        }
      }
    });
    return Observable.of(response).map(res => {
      if (res.status == 200) {
        HTTPConnection.saveToken(res.token, this._cookieService);
        this.loggedIn = true;
      }
      return res;
    });
  }

  register(user: User) : Observable<RegisterModel> {
    this.users.push(user);
    return Observable.of(new RegisterModel(200));
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

class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
