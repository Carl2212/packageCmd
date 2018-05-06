import { NgModule } from '@angular/core';
import { MenuModule } from '../core/directives/menu/menu.module';
import { AvatarModule } from '../core/components/avatar/avatar.module';
import { MidNavbarModule } from '../core/components/mid-navbar/mid-navbar.module';
import { CoreModule } from '../core/core.module';
import { Blank, BLANK_CONFIG } from './blank';
export { Blank } from './blank';
var BlankModule = (function () {
    function BlankModule() {
    }
    BlankModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: BlankModule,
            providers: [
                { provide: BLANK_CONFIG, useValue: config }
            ]
        };
    };
    return BlankModule;
}());
export { BlankModule };
BlankModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Blank
                ],
                entryComponents: [
                    Blank
                ],
                imports: [
                    MenuModule,
                    AvatarModule,
                    MidNavbarModule,
                    CoreModule
                ]
            },] },
];
/** @nocollapse */
BlankModule.ctorParameters = function () { return []; };
//# sourceMappingURL=blank.module.js.map