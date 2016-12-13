import {Directive} from "@angular/core";
import {AbstractControl, Validator} from "@angular/forms";

@Directive({
  selector: '[dateTimeValidator]'
})
export class DateTimeValidatorDirective implements Validator {

  constructor() {}

  validate(c: AbstractControl): {[key: string]: any} {
    let dateTime = c.value;
    if (dateTime && Date.parse(dateTime))
      return null;
    return {
      valid: false
    };
  }
}
