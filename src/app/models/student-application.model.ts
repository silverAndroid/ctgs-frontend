import {Constants} from "../constants";
/**
 * Created by silver_android on 30/11/16.
 */
export class StudentApplication {
  constructor(private _id: number, private _registrationCost: number, private _transportationCost: number, private _accommodationCost: number, private _mealCost: number,  private _owner: string, private _recommendation: string, private _conferenceDescription: string, private _presentationTitle: string, private _presentationOption: string, private _conferenceStartDateTime: Date, private _conferenceEndDateTime: Date, private _conferenceLocation: string, private _role: string) {
    this.registrationCost = _registrationCost;
    this.transportationCost = _transportationCost;
    this.accommodationCost = _accommodationCost;
    this.mealCost = _mealCost;
    this._recommendation = StudentApplication.parseRecommendation(this.recommendation);
  }

  get registrationCost(): number {
    return this._registrationCost;
  }

  set registrationCost(value: number) {
    this._registrationCost = Number(Number(value).toFixed(2));
  }

  get transportationCost(): number {
    return this._transportationCost;
  }

  set transportationCost(value: number) {
    this._transportationCost = Number(Number(value).toFixed(2));
  }

  get accommodationCost(): number {
    return this._accommodationCost;
  }

  set accommodationCost(value: number) {
    this._accommodationCost = Number(Number(value).toFixed(2));
  }

  get mealCost(): number {
    return this._mealCost;
  }

  set mealCost(value: number) {
    this._mealCost = Number(Number(value).toFixed(2));
  }

  get id(): number {
    return this._id;
  }

  get owner(): string {
    return this._owner;
  }

  get recommendation(): string {
    return this._recommendation;
  }

  set recommendation(value: string) {
    this._recommendation = value;
  }

  get role(): string {
    return this._role;
  }

  get conferenceDescription(): string {
    return this._conferenceDescription;
  }

  set conferenceDescription(value: string) {
    this._conferenceDescription = value;
  }

  get presentationTitle(): string {
    return this._presentationTitle;
  }

  set presentationTitle(value: string) {
    this._presentationTitle = value;
  }

  get presentationOption(): string {
    return this._presentationOption;
  }

  set presentationOption(value: string) {
    this._presentationOption = value;
  }

  get conferenceStartDateTime(): Date {
    return this._conferenceStartDateTime;
  }

  set conferenceStartDateTime(value: Date) {
    this._conferenceStartDateTime = value;
  }

  get conferenceEndDateTime(): Date {
    return this._conferenceEndDateTime;
  }

  set conferenceEndDateTime(value: Date) {
    this._conferenceEndDateTime = value;
  }

  get conferenceLocation(): string {
    return this._conferenceLocation;
  }

  set conferenceLocation(value: string) {
    this._conferenceLocation = value;
  }

  private static parseRecommendation(recommendation: string) : string {
    if (!recommendation)
      return Constants.CONST_PENDING;
    return recommendation;
  }
}
