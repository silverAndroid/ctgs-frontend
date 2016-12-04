/**
 * Created by silver_android on 03/12/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {HTTPConnection} from "./http.connection";
import {JSONResponseModel} from "../models/json-response.model";
import {StudentApplication} from "../models/student-application.model";
import {TextResponseModel} from "../models/text-response.model";

@Injectable()
export class ApplicationService {
  constructor(private _http: Http) {
  }

  getApplications(): Observable<JSONResponseModel> {
    return this._http.get(`${HTTPConnection.BASE_URL}/applications`)
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  createApplication(application: StudentApplication) : Observable<JSONResponseModel> {
    return this._http.post(`${HTTPConnection.BASE_URL}/applications`, {registration: application.registrationCost, transportation: application.transportationCost, accommodation: application.accommodationCost, meals: application.mealCost, supervisor: 'rushil'})
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError)
  }

  makeRecommendation(recommendation: string, applicationID: number) : Observable<TextResponseModel> {
    return this._http.put(`${HTTPConnection.BASE_URL}/application`, {recommendation: recommendation, applicationId: applicationID})
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError)
  }
}
