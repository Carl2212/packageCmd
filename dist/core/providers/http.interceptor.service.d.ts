import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { CoreStore } from '../core.store';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { ProfileStore } from "./profile/profile.store";
export declare class HttpInterceptorService implements HttpInterceptor {
    private store;
    private profileStore;
    constructor(store: CoreStore, profileStore: ProfileStore);
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
    private resetUrl(url);
    private handleError(error);
    profileUrl(url: string): string;
}
