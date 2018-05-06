import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { DesktopLM } from './desktopLM';
export { DesktopLM } from './desktopLM';
var DesktopLMModule = (function () {
    function DesktopLMModule() {
    }
    return DesktopLMModule;
}());
export { DesktopLMModule };
DesktopLMModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DesktopLM
                ],
                entryComponents: [
                    DesktopLM
                ],
                imports: [
                    CoreModule
                ]
            },] },
];
/** @nocollapse */
DesktopLMModule.ctorParameters = function () { return []; };
//# sourceMappingURL=desktopLM.module.js.map