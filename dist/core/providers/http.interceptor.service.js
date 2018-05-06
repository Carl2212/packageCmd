import { Injectable } from '@angular/core';
import { CoreStore } from '../core.store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { ProfileStore, PROFILETICKET } from "./profile/profile.store";
var HttpInterceptorService = (function () {
    function HttpInterceptorService(store, profileStore) {
        this.store = store;
        this.profileStore = profileStore;
    }
    HttpInterceptorService.prototype.intercept = function (request, next) {
        var _this = this;
        //Is it coming from profile requrest？
        var url = this.profileUrl(request.url);
        request = request.clone({
            url: url ? url : this.resetUrl(request.url),
            headers: url ? this.profileStore.headers : this.store.headers
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
    HttpInterceptorService.prototype.profileUrl = function (url) {
        if (url.indexOf(PROFILETICKET) > -1) {
            var api = url.split(PROFILETICKET)[0];
            return "" + this.profileStore.server + this.store.api[api];
        }
        return null;
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
    { type: ProfileStore, },
]; };
//# sourceMappingURL=http.interceptor.service.js.map