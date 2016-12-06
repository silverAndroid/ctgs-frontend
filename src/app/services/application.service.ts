/**
 * Created by silver_android on 03/12/16.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {HTTPConnection} from "./http.connection";
import {JSONResponseModel} from "../models/json-response.model";
import {StudentApplication} from "../models/student-application.model";
import {TextResponseModel} from "../models/text-response.model";

@Injectable()
export class ApplicationService {

  private recommendationSource = new Subject<RecommendationModel>();
  recommendation$ = this.recommendationSource.asObservable();

  constructor(private _http: Http) {}

  getApplications(role: string, username: string): Observable<JSONResponseModel> {
    return this._http.get(`${role}/applications/${username}`)
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError);
  }

  createApplication(application: StudentApplication): Observable<JSONResponseModel> {
    return this._http.post('/applications', {
      registration: application.registrationCost,
      transportation: application.transportationCost,
      accommodation: application.accommodationCost,
      meals: application.mealCost,
      conferenceDetail: application.conferenceDescription,
      presentationType: application.presentationOption,
      presentationTitle: application.presentationTitle
    })
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError)
  }

  makeRecommendation(recommendation: string, applicationID: number): Observable<TextResponseModel> {
    return this._http.put('/application', {recommendation: recommendation, applicationId: applicationID})
      .map(HTTPConnection.extractData)
      .catch(HTTPConnection.handleError)
  }

  emitRecommendation(recommendation: RecommendationModel) {
    this.recommendationSource.next(recommendation);
  }
}

export class RecommendationModel {
  constructor(public applicationID: number, public wasAccepted: boolean) {
  }
}
