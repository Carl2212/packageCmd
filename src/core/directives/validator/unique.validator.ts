import { AbstractControl , ValidatorFn, NG_VALIDATORS, Validator, ValidationErrors  } from "@angular/forms";
import { Directive, Input } from "@angular/core";

export function UniqueValidatorFn(sourceArray : Array<string>): ValidatorFn {
  return (control : AbstractControl):{[key : string] : any} =>{
    return sourceArray.indexOf(control.value) > -1 ? {'uniqueValidator' : {value : control.value} } : null;
  }
}

@Directive({
  selector : '[uniqueValidator][ngModel]',
  providers : [{provide : NG_VALIDATORS , useExisting : UniqueValidator , multi : true }]
})
export class UniqueValidator implements Validator {

  @Input('uniqueValidator') sourceArray: Array<string>;

  private _validator : ValidatorFn;
  constructor() {

  }
  validate(c: AbstractControl) : ValidationErrors | null{
    this._validator = UniqueValidatorFn(this.sourceArray);
    return this._validator(c);
  };
}
