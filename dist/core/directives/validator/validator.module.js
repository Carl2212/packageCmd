import { NgModule } from '@angular/core';
import { UniqueValidator } from "./unique.validator";
var ValidatorModule = (function () {
    function ValidatorModule() {
    }
    return ValidatorModule;
}());
export { ValidatorModule };
ValidatorModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    UniqueValidator
                ],
                exports: [
                    UniqueValidator
                ]
            },] },
];
/** @nocollapse */
ValidatorModule.ctorParameters = function () { return []; };
//# sourceMappingURL=validator.module.js.map