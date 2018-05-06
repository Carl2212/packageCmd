import { Injectable } from '@angular/core';
import { CoreStore } from '../core.store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
var HttpInterceptorService = (function () {
    function HttpInterceptorService(store) {
        this.store = store;
    }
    HttpInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        //Is it coming from profile requrest？
        request = request.clone({
            url: this.resetUrl(request.url),
            headers: this.store.headers
        });
        return next.handle(request)
            .timeout(this.store.time)
            .catch(function (error) {
            throw _this.handleError(error);
        });
    };
    HttpInterceptorService.prototype.resetUrl = function (url) {
        if (url.indexOf('json') === -1) {
            url = "" + this.store.server + this.store.api[url];
        }
        return url;
    };
    HttpInterceptorService.prototype.handleError = function (error) {
        if (error.status) {
            if (error.status === 401) {
                this.store.tokenExpire.emit(true);
            }
            return Observable.throw(error.status);
        }
        else {
            return Observable.throw('timeout');
        }
    };
    return HttpInterceptorService;
}());
export { HttpInterceptorService };
HttpInterceptorService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HttpInterceptorService.ctorParameters = function () { return [
    { type: CoreStore, },
]; };
//# sourceMappingURL=http.interceptor.service.js.map