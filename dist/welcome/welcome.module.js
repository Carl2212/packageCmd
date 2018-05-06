import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Welcome, WelcomeController } from './welcome';
import { CoreModule } from "../core/core.module";
import { WELCOMECONFIG } from "./config";
export * from './welcome';
export * from "./config";
var WelcomeModule = (function () {
    function WelcomeModule() {
    }
    WelcomeModule.forRoot = function (config) {
        if (config === void 0) { config = null; }
        return {
            ngModule: WelcomeModule,
            providers: [
                { provide: WELCOMECONFIG, useValue: config },
                WelcomeController
            ]
        };
    };
    return WelcomeModule;
}());
export { WelcomeModule };
WelcomeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Welcome,
                ],
                imports: [
                    IonicModule,
                    CoreModule
                ],
                bootstrap: [IonicApp],
                entryComponents: [
                    Welcome
                ]
            },] },
];
/** @nocollapse */
WelcomeModule.ctorParameters = function () { return []; };
//# sourceMappingURL=welcome.module.js.map