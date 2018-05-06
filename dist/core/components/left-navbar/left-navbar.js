import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoreStore } from '../../core.module';
import { DeviceService } from '../../providers/device.service';
var LeftNavbar = (function () {
    function LeftNavbar(dvService, store) {
        this.dvService = dvService;
        this.store = store;
        this.leftBtn = new EventEmitter();
    }
    LeftNavbar.prototype.next = function () {
        this.leftBtn.next('click');
    };
    LeftNavbar.prototype.ngOnInit = function () {
    };
    return LeftNavbar;
}());
export { LeftNavbar };
LeftNavbar.decorators = [
    { type: Component, args: [{
                selector: 'left-navbar',
                template: "\n    <ion-navbar color=\"darkblue\" no-border hideBackButton=\"true\" class=\"enable-env-top disable-env-left\">\n      <ion-buttons start>\n        <button ion-button clear color=\"light\" icon-only (click)=\"next()\">\n          <avatar [name]=\"name?name:(store?.user?.UserName)\"></avatar>\n          <span padding-left>{{name?name:(store?.user?.UserName)}}</span>\n        </button>\n      </ion-buttons>\n      <ion-buttons end>\n        <button ion-button clear color=\"light\" icon-only menuBtn=\"left\" *ngIf=\"dvService.isMobile()&&!directiveType\">\n          <ion-icon name=\"menu\"></ion-icon>\n        </button>\n        <button [class.active]=\"!!directiveType\" ion-button menuToggle clear color=\"light\" icon-only>\n          <ion-icon name=\"menu\"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-navbar>\n  ",
                styles: ["button.active { display: block!important;} \n            .bar-button-ios{height : auto}"]
            },] },
];
/** @nocollapse */
LeftNavbar.ctorParameters = function () { return [
    { type: DeviceService, },
    { type: CoreStore, },
]; };
LeftNavbar.propDecorators = {
    'name': [{ type: Input },],
    'directiveType': [{ type: Input },],
    'leftBtn': [{ type: Output },],
};
//# sourceMappingURL=left-navbar.js.map