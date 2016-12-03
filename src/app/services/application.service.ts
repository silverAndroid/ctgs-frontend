/**
 * Created by silver_android on 03/12/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {HTTPConnection} from "./http.connection";
import {JSONResponseModel} from "../models/json-response.model";

@Injectable()
export class ApplicationService {
  constructor(private _http: Http) {
  }

  getApplications(): Observable<JSONResponseModel> {
    return this._http.get(`${HTTPConnection.BASE_URL}/applications`)
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }
}
