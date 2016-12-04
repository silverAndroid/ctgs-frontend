/**
 * Created by silve on 2016-08-07.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/core";
import {HTTPConnection} from "./http.connection";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {TextResponseModel} from "../models/text-response.model";

@Injectable()
export class UserService {

  public loggedIn : boolean = true; // required to be public for AppComponent to check value constantly

  constructor(private _http: Http, private _cookieService: CookieService) {
    this.loggedIn = !(!HTTPConnection.getRole(_cookieService));
  }

  login(user: User) : Observable<TextResponseModel> {
    return this._http.post(`${HTTPConnection.BASE_URL}/login`, {username: user.username, password: user.password, role: user.role})
      .map(HTTPConnection.extractData)
      .map((res) => {
        if (!res.err) {
          HTTPConnection.saveRole(user.role, this._cookieService);
        }
        this.loggedIn = true;
        return res;
      })
      .catch(HTTPConnection.handleError);
  }

  register(user: User) : Observable<TextResponseModel> {
    let body = {name: user.name, username: user.username, password: user.password, email: user.email, role: user.role};
    console.log(body);
    return this._http.post(`${HTTPConnection.BASE_URL}/users`, body)
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  logout() {
    HTTPConnection.deleteRole(this._cookieService);
    this.loggedIn = false;
  }

  isLoggedIn() : boolean {
    return this.loggedIn;
  }
}
