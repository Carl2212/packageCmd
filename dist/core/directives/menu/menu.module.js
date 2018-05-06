import { NgModule } from '@angular/core';
import { MenuDirective } from './menu.directive';
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
export { MenuModule };
MenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MenuDirective
                ],
                exports: [
                    MenuDirective
                ]
            },] },
];
/** @nocollapse */
MenuModule.ctorParameters = function () { return []; };
//# sourceMappingURL=menu.module.js.map