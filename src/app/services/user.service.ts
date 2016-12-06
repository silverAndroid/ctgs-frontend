/**
 * Created by silve on 2016-08-07.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {CookieService} from "angular2-cookie/core";
import {HTTPConnection} from "./http.connection";
import {Observable, Subject} from "rxjs";
import {User} from "../models/user.model";
import {TextResponseModel} from "../models/text-response.model";
import {JSONResponseModel} from "../models/json-response.model";

@Injectable()
export class UserService {

  public loggedIn: boolean = true; // required to be public for AppComponent to check value constantly

  private loggedInSource = new Subject<boolean>();
  loggedIn$ = this.loggedInSource.asObservable();

  constructor(private _http: Http, private _cookieService: CookieService) {
    this.loggedIn = !(!HTTPConnection.getRole(_cookieService));
  }

  login(user: User): Observable<TextResponseModel> {
    return this._http.post('/login', {
      username: user.username,
      password: user.password,
      role: user.role
    })
      .map(HTTPConnection.extractData)
      .map((res) => {
        if (!res.err) {
          HTTPConnection.saveRole(user.role, this._cookieService);
          HTTPConnection.saveUser(user.username, this._cookieService);
          this.emitLoggedIn(true);
        }
        this.loggedIn = true;
        return res;
      })
      .catch(HTTPConnection.handleError);
  }

  register(user: User): Observable<TextResponseModel> {
    return this._http.post('/users', {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role
    })
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  getSupervisors() : Observable<JSONResponseModel> {
    return this._http.get('/supervisors')
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  logout() {
    HTTPConnection.deleteRole(this._cookieService);
    HTTPConnection.deleteUser(this._cookieService);
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  emitLoggedIn(loggedIn: boolean) {
    this.loggedInSource.next(loggedIn);
  }
}
