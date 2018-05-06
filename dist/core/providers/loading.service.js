import { Injectable } from '@angular/core';
import { LoadingController } from "ionic-angular";
var LoadingService = (function () {
    function LoadingService(loading) {
        this.loading = loading;
        this.create();
    }
    LoadingService.prototype.create = function (opt) {
        this.loader = this.loading.create(opt);
        return this.loader;
    };
    LoadingService.prototype.dismiss = function () {
        this.loader.dismiss();
    };
    return LoadingService;
}());
export { LoadingService };
LoadingService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LoadingService.ctorParameters = function () { return [
    { type: LoadingController, },
]; };
//# sourceMappingURL=loading.service.js.map