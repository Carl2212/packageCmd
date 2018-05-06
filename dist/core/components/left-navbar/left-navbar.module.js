import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AvatarModule } from '../../components/avatar/avatar.module';
import { MenuModule } from '../../directives/menu/menu.module';
import { DeviceService } from '../../providers/device.service';
import { LeftNavbar } from './left-navbar';
var LeftNavbarModule = (function () {
    function LeftNavbarModule() {
    }
    return LeftNavbarModule;
}());
export { LeftNavbarModule };
LeftNavbarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LeftNavbar
                ],
                providers: [
                    DeviceService
                ],
                imports: [
                    IonicModule,
                    MenuModule,
                    AvatarModule
                ],
                exports: [
                    LeftNavbar
                ]
            },] },
];
/** @nocollapse */
LeftNavbarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=left-navbar.module.js.map