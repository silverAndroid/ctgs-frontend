/**
 * Created by silver_android on 30/11/16.
 */
export class StudentApplication {
  constructor(private _registrationCost: number, private _transportationCost: number, private _accommodationCost: number, private _mealCost: number) {
    this.registrationCost = Number(this.registrationCost.toFixed(2));
    this.transportationCost = Number(this.transportationCost.toFixed(2));
    this.accommodationCost = Number(this.accommodationCost.toFixed(2));
    this.mealCost = Number(this.mealCost.toFixed(2));
  }

  get registrationCost(): number {
    return this._registrationCost;
  }

  set registrationCost(value: number) {
    this._registrationCost = value;
  }

  get transportationCost(): number {
    return this._transportationCost;
  }

  set transportationCost(value: number) {
    this._transportationCost = value;
  }

  get accommodationCost(): number {
    return this._accommodationCost;
  }

  set accommodationCost(value: number) {
    this._accommodationCost = value;
  }

  get mealCost(): number {
    return this._mealCost;
  }

  set mealCost(value: number) {
    this._mealCost = value;
  }
}
