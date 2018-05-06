import { Injectable } from '@angular/core';
import { NavController } from "ionic-angular";
var NavStack = (function () {
    function NavStack() {
        this.rootNav = NavController;
        this.leftNav = NavController;
        this.contNav = NavController;
        this.rightNav = NavController;
    }
    return NavStack;
}());
export { NavStack };
NavStack.decorators = [
    { type: Injectable },
];
/** @nocollapse */
NavStack.ctorParameters = function () { return []; };
//# sourceMappingURL=nav.service.js.map