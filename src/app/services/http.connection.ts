import {Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {CookieService} from "angular2-cookie/core";
import {TextResponseModel} from "../models/text-response.model";
import {MdSnackBarRef, MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {AlertsService} from "./alerts.service";
/**
 * Created by silve on 2016-08-07.
 */

export class HTTPConnection {

  private static roleKey = 'role';
  private static userKey = 'username';

  public static getRole(cookieService: CookieService): string {
    return this.getCookie(this.roleKey, cookieService);
  }

  public static saveRole(role: string, cookieService: CookieService) {
    this.saveCookie(this.roleKey, role, cookieService);
  }

  public static deleteRole(cookieService: CookieService) {
    this.deleteCookie(this.roleKey, cookieService);
  }

  public static getUser(cookieService: CookieService): string {
    return this.getCookie(this.userKey, cookieService);
  }

  public static saveUser(username: string, cookieService: CookieService) {
    this.saveCookie(this.userKey, username, cookieService);
  }

  public static deleteUser(cookieService: CookieService) {
    this.deleteCookie(this.userKey, cookieService);
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
    return res.headers.get('content-type').indexOf('application/json') >= 0 ? res.json() : new TextResponseModel(res.status == 500 || res.status == 403 || res.status == 401 || res.status == 400, res.text()) || {};
  }

  public static handleError(error: any, _snackbar?: AlertsService) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = "Error: " + (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(error._body); // log to console instead
    _snackbar.showMsg(error._body, false, '', 5);
    return Observable.throw(errMsg);
  }
}
