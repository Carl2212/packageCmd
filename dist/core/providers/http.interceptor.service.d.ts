import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { CoreStore } from '../core.store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
export declare class HttpInterceptorService implements HttpInterceptor {
    private store;
    constructor(store: CoreStore);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private resetUrl(url);
    private handleError(error);
}
