import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { CoreStore } from '../core.store';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/catch';
import { ProfileStore, PROFILETICKET } from "./profile/profile.store";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

	constructor(
	  private store: CoreStore,
    private profileStore : ProfileStore
  ) {}

 	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
	  //Is it coming from profile requrest？
    let url = this.profileUrl(request.url);
    request = request.clone({
    	url: url ? url : this.resetUrl(request.url),
      headers: url ? this.profileStore.headers : this.store.headers
    });

    return next.handle(request)
    	.timeout(this.store.time)
			.catch(error => {
				throw this.handleError(error);
			});
  }

	private resetUrl(url: string): string {
		if(url.indexOf('json') === -1) {
	    url = `${this.store.server}${this.store.api[url]}`;
	  }
		return url;
  }
  private handleError(error: HttpErrorResponse): Observable<any> {
		if(error.status) {
			if(error.status === 401) {
				this.store.tokenExpire.emit(true);
			}
			return Observable.throw(error.status);
		} else {
			return Observable.throw('timeout');
		}
	}
  profileUrl(url: string) : string {
    if(url.indexOf(PROFILETICKET) > -1) {
      let api = url.split(PROFILETICKET)[0];
      return `${this.profileStore.server}${this.store.api[api]}`;
    }
    return null;
  }
}