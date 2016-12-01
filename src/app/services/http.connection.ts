import {RequestOptionsArgs, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CookieService} from 'angular2-cookie/core'
/**
 * Created by silve on 2016-08-07.
 */

export class HTTPConnection {

  private static loggedInKey = 'loggedIn';

  public static addAuthorizationHeader(token: string, requestOptionsArgs?: RequestOptionsArgs) : RequestOptionsArgs {
    if (requestOptionsArgs) {
      requestOptionsArgs.headers.append('Authorization', token);
      return requestOptionsArgs;
    }

    let headers = new Headers();
    headers.append('Authorization', token);
    return {headers: headers};
  }

  //Copied from the Angular 2 Developer Guide - HTTP Client
  public static extractData(res: Response) {
    return res.json() || {};
  }

  public static handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = "Error: " + (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  public static getToken(cookieService: CookieService) : string {
    return this.getCookie(this.loggedInKey, cookieService);
  }

  public static saveToken(isLoggedIn: string, cookieService: CookieService) {
    this.saveCookie(this.loggedInKey, isLoggedIn, cookieService);
  }

  public static deleteToken(cookieService: CookieService) {
    this.deleteCookie(this.loggedInKey, cookieService);
  }

  private static getCookie(key: string, cookieService: CookieService) : string {
    return cookieService.get(key);
  }

  private static saveCookie(key: string, value: string, cookieService: CookieService) {
    cookieService.put(key, value);
  }

  private static deleteCookie(key: string, cookieService: CookieService) {
    cookieService.remove(key);
  }
}
