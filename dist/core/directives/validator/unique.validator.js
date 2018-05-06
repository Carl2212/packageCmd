import { NG_VALIDATORS } from "@angular/forms";
import { Directive, Input } from "@angular/core";
export function UniqueValidatorFn(sourceArray) {
    return function (control) {
        return sourceArray.indexOf(control.value) > -1 ? { 'uniqueValidator': { value: control.value } } : null;
    };
}
var UniqueValidator = (function () {
    function UniqueValidator() {
    }
    UniqueValidator.prototype.validate = function (c) {
        this._validator = UniqueValidatorFn(this.sourceArray);
        return this._validator(c);
    };
    ;
    return UniqueValidator;
}());
export { UniqueValidator };
UniqueValidator.decorators = [
    { type: Directive, args: [{
                selector: '[uniqueValidator][ngModel]',
                providers: [{ provide: NG_VALIDATORS, useExisting: UniqueValidator, multi: true }]
            },] },
];
/** @nocollapse */
UniqueValidator.ctorParameters = function () { return []; };
UniqueValidator.propDecorators = {
    'sourceArray': [{ type: Input, args: ['uniqueValidator',] },],
};
//# sourceMappingURL=unique.validator.js.map