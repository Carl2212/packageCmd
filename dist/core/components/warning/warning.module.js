import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { WarningComponent } from './warning.component';
var WarningModule = (function () {
    function WarningModule() {
    }
    return WarningModule;
}());
export { WarningModule };
WarningModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    WarningComponent
                ],
                imports: [
                    IonicModule,
                    TranslateModule.forChild()
                ],
                exports: [
                    WarningComponent
                ]
            },] },
];
/** @nocollapse */
WarningModule.ctorParameters = function () { return []; };
//# sourceMappingURL=warning.module.js.map