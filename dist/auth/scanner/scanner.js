import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
var Scanner = (function () {
    function Scanner(qrScanner, viewCtrl) {
        this.qrScanner = qrScanner;
        this.viewCtrl = viewCtrl;
        this.light = false;
        this.scanBody = "has-bg";
    }
    Scanner.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.qrScanner.prepare()
            .then(function (status) {
            if (status.authorized) {
                // camera permission was granted
                // start scanning
                var scanSub_1 = _this.qrScanner.scan().subscribe(function (data) {
                    _this.qrScanner.hide();
                    _this.viewCtrl.dismiss(data);
                    scanSub_1.unsubscribe();
                });
                // show camera preview
                _this.qrScanner.show();
                // wait for user to scan something, then the observable callback will be called
            }
            else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
            }
            else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
            }
        })
            .catch(function (e) { return console.log('Error is', e); });
    };
    Scanner.prototype.toggleLight = function () {
        if (this.light) {
            this.qrScanner.disableLight();
        }
        else {
            this.qrScanner.enableLight();
        }
        this.light = !this.light;
    };
    Scanner.prototype.showCamera = function () {
        window.document.querySelector('ion-app').classList.add('cameraView');
    };
    Scanner.prototype.hideCamera = function () {
        window.document.querySelector('ion-app').classList.remove('cameraView');
    };
    Scanner.prototype.ionViewDidEnter = function () {
        this.showCamera();
        this.scanBody = "no-bg";
    };
    Scanner.prototype.ionViewWillLeave = function () {
        this.hideCamera();
        this.scanBody = "has-bg";
        if (this.light) {
            this.toggleLight();
        }
    };
    return Scanner;
}());
export { Scanner };
Scanner.decorators = [
    { type: Component, args: [{
                selector: 'scanner',
                template: "\n    <ion-header>\n      <ion-navbar hideBackButton=\"true\">\n        <ion-buttons start>\n          <button ion-button clear icon-only color=\"dark\" navPop>\n            <ion-icon name=\"arrow-back-thin\"></ion-icon>\n          </button>\n        </ion-buttons>\n        <ion-title>{{'auth.scan' | translate}}</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content no-scroll [ngClass]=\"scanBody\">\n      <div [hidden]=\"scanBody=='has-bg'\" class=\"scanner-wrapper\">\n        <div class=\"scanner\">\n          <div class=\"scan-area\" text-center></div> \n          <div class=\"through-line\"></div>\n          <div class=\"scan-name\">{{'auth.code' | translate}}</div>\n        </div>\n        <div class=\"button-bottom\">\n          <ion-icon [name]=\"light?'flashlight_on':'flashlight_off'\" (click)=\"toggleLight()\" color=\"light\" tappable class=\"scan-icon\"></ion-icon>\n          <div *ngIf=\"light\" padding-top>{{'auth.lightOn' | translate}}</div>\n          <div *ngIf=\"!light\" padding-top>{{'auth.lightOff' | translate}}</div>\n        </div>\n      </div> \n    </ion-content>\n  ",
            },] },
];
/** @nocollapse */
Scanner.ctorParameters = function () { return [
    { type: QRScanner, },
    { type: ViewController, },
]; };
//# sourceMappingURL=scanner.js.map