/**
 * Created by silver_android on 06/12/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {SecretConstants} from "../secret-constants";
import {HTTPConnection} from "./http.connection";
import {AlertsService} from "./alerts.service";
import {Observable} from "rxjs";
import {JSONResponseModel} from "../models/json-response.model";

@Injectable()
export class GoogleMapsService {

  constructor(private _http: Http, private _snackbar: AlertsService) {
  }

  search(input: string): Observable<JSONResponseModel> {
    return this._http.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${SecretConstants.GOOGLE_MAPS_API_KEY}`)
      .map(HTTPConnection.extractData)
      .catch(err => {
        return HTTPConnection.handleError(err, this._snackbar);
      });
  }

  getMapsURL(placeID: string): Observable<JSONResponseModel> {
    return this._http.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${SecretConstants.GOOGLE_MAPS_API_KEY}&placeid=${placeID}`)
      .map(HTTPConnection.extractData)
      .catch(err => {
        return HTTPConnection.handleError(err, this._snackbar);
      })
  }
}
