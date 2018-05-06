import { AbstractControl, ValidatorFn, Validator, ValidationErrors } from "@angular/forms";
export declare function UniqueValidatorFn(sourceArray: Array<string>): ValidatorFn;
export declare class UniqueValidator implements Validator {
    sourceArray: Array<string>;
    private _validator;
    constructor();
    validate(c: AbstractControl): ValidationErrors | null;
}
