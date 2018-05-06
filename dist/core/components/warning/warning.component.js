import { Component, Input, Output, EventEmitter } from '@angular/core';
var WarningComponent = (function () {
    function WarningComponent() {
        this.event = new EventEmitter();
    }
    WarningComponent.prototype.pushBtn = function () {
        this.event.next();
    };
    return WarningComponent;
}());
export { WarningComponent };
WarningComponent.decorators = [
    { type: Component, args: [{
                selector: 'warning',
                template: "\n    <div text-center padding-top margin-top>\n      <ion-label color=\"darkgray\" *ngIf=\"msg\">{{msg | translate}}</ion-label>\n      <button ion-button color=\"primary\" icon-only (click)=\"pushBtn()\" *ngIf=\"!btn\">\n        <ion-icon name=\"refresh\"></ion-icon>\n      </button>\n      <button ion-button color=\"primary\" icon-only (click)=\"pushBtn()\" *ngIf=\"btn\">\n        <ion-icon name=\"plus\"></ion-icon>\n      </button>\n    </div>\n  "
            },] },
];
/** @nocollapse */
WarningComponent.ctorParameters = function () { return []; };
WarningComponent.propDecorators = {
    'msg': [{ type: Input },],
    'btn': [{ type: Input },],
    'event': [{ type: Output },],
};
//# sourceMappingURL=warning.component.js.map