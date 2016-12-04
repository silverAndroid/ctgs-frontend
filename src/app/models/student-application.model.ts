/**
 * Created by silver_android on 30/11/16.
 */
export class StudentApplication {
  constructor(private _id: number, private _registrationCost: number, private _transportationCost: number, private _accommodationCost: number, private _mealCost: number,  private _owner: string, private _recommendation: string, private _role: string) {
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

  get role(): string {
    return this._role;
  }

  private static parseRecommendation(recommendation: string) : string {
    if (!recommendation)
      return 'Pending';
    return recommendation;
  }
}
