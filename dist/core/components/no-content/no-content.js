import { Component, EventEmitter, Input, Output } from '@angular/core';
var NoContent = (function () {
    function NoContent() {
        this.event = new EventEmitter();
        this.msgKey = 'error.noContent';
    }
    NoContent.prototype.refreshEvent = function () {
        this.event.emit(true);
    };
    return NoContent;
}());
export { NoContent };
NoContent.decorators = [
    { type: Component, args: [{
                selector: 'no-content',
                template: "\n    <div color=\"no-color\" text-center margin-top>\n      <div class=\"no-content-icon\"><ion-icon name=\"{{warningIcon ? warningIcon : 'warning-circle'}}\" color=\"icon-color\" *ngIf=\"!btn\"></ion-icon></div>\n      <ion-label text-center padding-top>{{(msg ? msg : msgKey) | translate}}</ion-label>\n\n      <button ion-fab color=\"primary\" class=\"round-button\" *ngIf=\"btn\" (click)=\"refreshEvent()\">\n        <ion-icon name=\"refresh\"></ion-icon>\n      </button>\n    </div>\n  ",
                styles: ["\n    .no-content-icon ion-icon{\n      font-size: 80px !important;\n    }\n    .round-button{\n      margin : 0 auto;\n    }\n  "]
            },] },
];
/** @nocollapse */
NoContent.ctorParameters = function () { return []; };
NoContent.propDecorators = {
    'warningIcon': [{ type: Input },],
    'msg': [{ type: Input },],
    'btn': [{ type: Input },],
    'event': [{ type: Output },],
};
//# sourceMappingURL=no-content.js.map