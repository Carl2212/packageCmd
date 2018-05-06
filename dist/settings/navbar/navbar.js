import { Component } from '@angular/core';
var SettingNavbar = (function () {
    function SettingNavbar() {
        this.translation = {};
    }
    return SettingNavbar;
}());
export { SettingNavbar };
SettingNavbar.decorators = [
    { type: Component, args: [{
                selector: 'setting-navbar',
                template: "\n    <ion-navbar color=\"darkblue\" no-border hideBackButton=\"true\" class=\"enable-env-top disable-env-left\">\n      <ion-buttons start>\n        <button ion-button clear color=\"light\" icon-only navPop>\n          <ion-icon name=\"arrow-back-thin\"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>{{'setting.setting' | translate}}</ion-title>\n    </ion-navbar>\n  "
            },] },
];
/** @nocollapse */
SettingNavbar.ctorParameters = function () { return []; };
//# sourceMappingURL=navbar.js.map