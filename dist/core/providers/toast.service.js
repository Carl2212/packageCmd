import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
var ToastService = (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastService.prototype.success = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 1000,
            cssClass: 'success',
        });
        toast.present();
    };
    ToastService.prototype.warning = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            cssClass: 'warning',
        });
        toast.present();
    };
    ToastService.prototype.error = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            cssClass: 'error',
        });
        toast.present();
    };
    return ToastService;
}());
export { ToastService };
ToastService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ToastService.ctorParameters = function () { return [
    { type: ToastController, },
]; };
//# sourceMappingURL=toast.service.js.map