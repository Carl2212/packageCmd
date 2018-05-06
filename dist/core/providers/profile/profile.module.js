import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular";
import { ProfileService } from "./profile.service";
import { AccountManager } from "./accountManager";
import { ProfileShareService } from "./profileShare.service";
import { ProfileStore } from "./profile.store";
export { ProfileService } from "./profile.service";
export { AccountManager } from "./accountManager";
export { ProfileShareService } from "./profileShare.service";
export { ProfileStore } from "./profile.store";
var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
export { ProfileModule };
ProfileModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    AccountManager,
                    ProfileShareService,
                    ProfileService,
                    ProfileStore
                ],
                imports: [
                    IonicModule
                ]
            },] },
];
/** @nocollapse */
ProfileModule.ctorParameters = function () { return []; };
//# sourceMappingURL=profile.module.js.map