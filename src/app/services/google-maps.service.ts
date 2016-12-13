/**
 * Created by silver_android on 06/12/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {HTTPConnection} from "./http.connection";
import {AlertsService} from "./alerts.service";
import {Observable} from "rxjs";
import {JSONResponseModel} from "../models/json-response.model";

@Injectable()
export class GoogleMapsService {

  constructor(private _http: Http, private _snackbar: AlertsService) {
  }

  search(input: string): Observable<JSONResponseModel> {
    return this._http.get(`/maps/search?input=${input}`)
      .map(HTTPConnection.extractData)
      .catch(err => {
        return HTTPConnection.handleError(err, this._snackbar);
      });
  }

  getMapsURL(placeID: string): Observable<JSONResponseModel> {
    return this._http.get(`/maps/url?placeID=${placeID}`)
      .map(HTTPConnection.extractData)
      .catch(err => {
        return HTTPConnection.handleError(err, this._snackbar);
      })
  }
}
