import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoContent } from "./no-content";
var NoContentModule = (function () {
    function NoContentModule() {
    }
    return NoContentModule;
}());
export { NoContentModule };
NoContentModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    NoContent
                ],
                imports: [
                    IonicModule,
                    TranslateModule.forChild(),
                ],
                exports: [
                    NoContent
                ]
            },] },
];
/** @nocollapse */
NoContentModule.ctorParameters = function () { return []; };
//# sourceMappingURL=no-content.module.js.map