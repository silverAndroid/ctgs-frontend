/**
 * Created by silver_android on 30/11/16.
 */
export class StudentApplication {
  constructor(private _registrationCost: number, private _transportationCost: number, private _accommodationCost: number, private _mealCost: number,  private _owner: string, private _role: string) {
    this._registrationCost = Number(this._registrationCost.toFixed(2));
    this._transportationCost = Number(this._transportationCost.toFixed(2));
    this._accommodationCost = Number(this._accommodationCost.toFixed(2));
    this._mealCost = Number(this._mealCost.toFixed(2));
  }

  get registrationCost(): number {
    return this._registrationCost;
  }

  get transportationCost(): number {
    return this._transportationCost;
  }

  get accommodationCost(): number {
    return this._accommodationCost;
  }

  get mealCost(): number {
    return this._mealCost;
  }

  get role(): string {
    return this._role;
  }

  get owner(): string {
    return this._owner;
  }
}
