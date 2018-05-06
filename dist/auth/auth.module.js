import { NgModule } from '@angular/core';
import { Auth, AUTH_CONFIG } from './auth';
import { Login } from './login/login';
import { Server } from './server/server';
import { Scanner } from './scanner/scanner';
import { Company } from './company/company';
import { TreeNode } from './company/treenode';
import { Help } from './help/help';
import { CoreModule } from '../core/core.module';
import { AuthService } from './auth.service';
import { Profile } from "./profile/profile";
export { AuthService } from './auth.service';
export { Auth } from './auth';
export { Company } from './company/company';
var AuthModule = (function () {
    function AuthModule() {
    }
    /**
     * Use this method in your root module to provide the AuthService
     * @param {AuthModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    AuthModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: AuthModule,
            providers: [
                { provide: AUTH_CONFIG, useValue: config },
                AuthService
            ]
        };
    };
    return AuthModule;
}());
export { AuthModule };
AuthModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    Auth,
                    Server,
                    Scanner,
                    Login,
                    Company,
                    TreeNode,
                    Help,
                    Profile
                ],
                entryComponents: [
                    Auth,
                    Server,
                    Scanner,
                    Login,
                    Company,
                    TreeNode,
                    Help,
                    Profile
                ],
                providers: [
                    AuthService
                ],
                imports: [
                    CoreModule
                ]
            },] },
];
/** @nocollapse */
AuthModule.ctorParameters = function () { return []; };
//# sourceMappingURL=auth.module.js.map