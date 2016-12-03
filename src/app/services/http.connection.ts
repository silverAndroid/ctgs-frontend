import {RequestOptionsArgs, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CookieService} from "angular2-cookie/core";
import {ResponseModel} from "../models/response.model";
import {log} from "util";
/**
 * Created by silve on 2016-08-07.
 */

export class HTTPConnection {

  private static roleKey = 'role';

  public static BASE_URL = 'http://localhost:8080';

  public static changeContentType(requestOptionsArgs?: RequestOptionsArgs): RequestOptionsArgs {
    if (requestOptionsArgs) {
      requestOptionsArgs.headers.append('Content-Type', 'application/json');
      return requestOptionsArgs;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return {headers: headers};
  }

  public static getRole(cookieService: CookieService): string {
    return this.getCookie(this.roleKey, cookieService);
  }

  public static saveRole(role: string, cookieService: CookieService) {
    this.saveCookie(this.roleKey, role, cookieService);
  }

  public static deleteRole(cookieService: CookieService) {
    this.deleteCookie(this.roleKey, cookieService);
  }

  private static getCookie(key: string, cookieService: CookieService): string {
    return cookieService.get(key);
  }

  private static saveCookie(key: string, value: string, cookieService: CookieService) {
    cookieService.put(key, value);
  }

  private static deleteCookie(key: string, cookieService: CookieService) {
    cookieService.remove(key);
  }

  // Copied from the Angular 2 Developer Guide - HTTP Client
  public static extractData(res: Response) {
    return res.headers.get('content-type') == 'application/json' ? res.json() : new ResponseModel(res.status == 500 || res.status == 403 || res.status == 401 || res.status == 400, res.text()) || {};
  }

  public static handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = "Error: " + (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
