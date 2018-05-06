import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
var DeviceService = (function () {
    function DeviceService(platform) {
        this.platform = platform;
    }
    DeviceService.prototype.isCordova = function () {
        if (this.platform.is('cordova')) {
            return true;
        }
        else {
            return false;
        }
    };
    DeviceService.prototype.isMobile = function () {
        if (this.platform.is('iphone') || (this.platform.is('mobile') && !this.platform.is('tablet'))) {
            if (this.platform.isLandscape() && this.platform.width() < 813 || this.platform.isPortrait() && this.platform.height() < 813) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.platform.is('phablet') || (this.platform.is('mobile') && this.platform.is('tablet'))) {
            if (this.platform.isPortrait() && this.platform.width() < 767) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    return DeviceService;
}());
export { DeviceService };
DeviceService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DeviceService.ctorParameters = function () { return [
    { type: Platform, },
]; };
//# sourceMappingURL=device.service.js.map