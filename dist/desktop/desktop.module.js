import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { Desktop } from './desktop';
export { Desktop } from './desktop';
var DesktopModule = (function () {
    function DesktopModule() {
    }
    return DesktopModule;
}());
export { DesktopModule };
DesktopModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Desktop
                ],
                entryComponents: [
                    Desktop
                ],
                imports: [
                    CoreModule
                ]
            },] },
];
/** @nocollapse */
DesktopModule.ctorParameters = function () { return []; };
//# sourceMappingURL=desktop.module.js.map