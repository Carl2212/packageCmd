import { Component, Input } from '@angular/core';
var MidNavbar = (function () {
    function MidNavbar() {
    }
    MidNavbar.prototype.ngOnInit = function () {
    };
    return MidNavbar;
}());
export { MidNavbar };
MidNavbar.decorators = [
    { type: Component, args: [{
                selector: 'mid-navbar',
                template: "\n    <ion-navbar color=\"primary\" hideBackButton=\"true\"  class=\"enable-env-top disable-env-left\">\n      <ion-buttons start>\n        <button *ngIf=\"!directiveType\" ion-button menuBtn=\"left\" clear color=\"light\" icon-only>\n          <ion-icon name=\"menu\"></ion-icon>\n        </button>\n        <button [class.active]=\"!!directiveType\" ion-button menuToggle clear color=\"light\" icon-only>\n          <ion-icon name=\"menu\"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-title>{{title | translate}}</ion-title>\n    </ion-navbar>\n  ",
                styles: ["button.active { display: block!important;}"]
            },] },
];
/** @nocollapse */
MidNavbar.ctorParameters = function () { return []; };
MidNavbar.propDecorators = {
    'title': [{ type: Input },],
    'directiveType': [{ type: Input },],
};
//# sourceMappingURL=mid-navbar.js.map