import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from '../../directives/menu/menu.module';
import { MidNavbar } from './mid-navbar';
var MidNavbarModule = (function () {
    function MidNavbarModule() {
    }
    return MidNavbarModule;
}());
export { MidNavbarModule };
MidNavbarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MidNavbar
                ],
                imports: [
                    IonicModule,
                    TranslateModule.forChild(),
                    MenuModule
                ],
                exports: [
                    MidNavbar
                ]
            },] },
];
/** @nocollapse */
MidNavbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=mid-navbar.module.js.map