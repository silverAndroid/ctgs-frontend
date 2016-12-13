import {Directive} from "@angular/core";
import {Validator, AbstractControl} from "@angular/forms";

@Directive({
  selector: '[moneyValidator]'
})
export class MoneyValidatorDirective implements Validator {

  constructor() { }

  validate(c: AbstractControl): {[key: string]: any} {
    let money = c.value;
    if (money && money.match(/(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)(\.[0-9]{1,2})?$/))
      return null;
    return {
      valid: false
    };
  }
}
