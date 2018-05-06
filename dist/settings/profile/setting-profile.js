import { Component, ViewChild } from '@angular/core';
import { Profile } from "./profile";
import { NavController } from "ionic-angular";
var SettingProfile = (function () {
    function SettingProfile(navCtrl) {
        this.navCtrl = navCtrl;
        this.rootPage = Profile;
    }
    SettingProfile.prototype.navpop = function () {
        if (this.profileNav.length() > 1) {
            this.profileNav.pop();
        }
        else {
            this.navCtrl.pop();
        }
    };
    return SettingProfile;
}());
export { SettingProfile };
SettingProfile.decorators = [
    { type: Component, args: [{
                template: "\n    <ion-header>\n      <setting-navbar></setting-navbar>\n      <button ion-button full clear color=\"light\" no-margin no-padding (click)=\"navpop()\">\n      </button>\n    </ion-header>\n    <ion-content>\n      <ion-nav #profileNav [root]=\"rootPage\" class=\"disable-env-top\"></ion-nav>\n    </ion-content>\n  ",
                styles: ["\n    ion-header > button{\n      position: absolute;\n      left :0;\n      top :0;\n      z-index:999;\n    }\n  "]
            },] },
];
/** @nocollapse */
SettingProfile.ctorParameters = function () { return [
    { type: NavController, },
]; };
SettingProfile.propDecorators = {
    'profileNav': [{ type: ViewChild, args: ['profileNav',] },],
};
//# sourceMappingURL=setting-profile.js.map