import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { LangService } from './providers/translate.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './providers/http.interceptor.service';
import { NavStack } from './providers/nav.service';
import { DesService } from './providers/des.service';
import { ToastService } from './providers/toast.service';
import { LoadingService } from './providers/loading.service';
import { DeviceService } from './providers/device.service';
import { WarningModule } from './components/warning/warning.module';
import { AvatarModule } from './components/avatar/avatar.module';
import { MenuModule } from './directives/menu/menu.module';
import { CoreStore } from './core.store';
import { NativeStorage } from "@ionic-native/native-storage";
import { ValidatorModule } from "./directives/validator/validator.module";
import { NoContentModule } from "./components/no-content/no-content.module";
import { ProfileModule } from "./providers/profile/profile.module";
export * from './core.store';
export { NavStack } from './providers/nav.service';
export { DesService } from './providers/des.service';
export { LangService } from './providers/translate.service';
export { ToastService } from './providers/toast.service';
export { LoadingService } from './providers/loading.service';
export { DeviceService } from './providers/device.service';
export { WarningModule } from './components/warning/warning.module';
export { AvatarModule } from './components/avatar/avatar.module';
export { MenuModule } from './directives/menu/menu.module';
export { ValidatorModule } from "./directives/validator/validator.module";
export { NoContentModule } from "./components/no-content/no-content.module";
export * from "./providers/profile/profile.module";
var CoreModule = (function () {
    function CoreModule(parentModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only');
        }
    }
    CoreModule.forRoot = function (config) {
        if (config === void 0) { config = {}; }
        return {
            ngModule: CoreModule,
            providers: [
                config.store || CoreStore,
                config.interceptor || HttpInterceptorService,
                config.navStack || NavStack,
                DesService,
                LangService,
                ToastService,
                LoadingService,
                DeviceService
            ]
        };
    };
    return CoreModule;
}());
export { CoreModule };
CoreModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    NavStack,
                    DesService,
                    LangService,
                    ToastService,
                    LoadingService,
                    HttpInterceptorService,
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: HttpInterceptorService,
                        multi: true
                    },
                    CoreStore,
                    DeviceService,
                    NativeStorage
                ],
                imports: [
                    IonicModule,
                    HttpClientModule,
                    TranslateModule.forChild(),
                    ProfileModule
                ],
                exports: [
                    IonicModule,
                    HttpClientModule,
                    TranslateModule,
                    WarningModule,
                    AvatarModule,
                    MenuModule,
                    ValidatorModule,
                    NoContentModule,
                    ProfileModule
                ]
            },] },
];
/** @nocollapse */
CoreModule.ctorParameters = function () { return [
    { type: CoreModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
]; };
//# sourceMappingURL=core.module.js.map