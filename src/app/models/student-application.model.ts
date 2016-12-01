/**
 * Created by silver_android on 30/11/16.
 */
export class StudentApplication {
  constructor(public registrationCost: number, public transportationCost: number, public accomodationCost: number, public mealCost: number) {
    this.registrationCost = Number(registrationCost.toFixed(2));
    this.transportationCost = Number(transportationCost.toFixed(2));
    this.accomodationCost = Number(accomodationCost.toFixed(2));
    this.mealCost = Number(mealCost.toFixed(2));
  }
}
