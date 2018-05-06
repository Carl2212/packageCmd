import { HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { deepCopy } from 'ionic-angular/util/util';

export const CONTEXT = {
  "companyCode":"",
  "signedInClientId": 0,
  "clientId": 0,
  "permissionClientId": 0,
  "permissionRoleId": 0,
  "dataLanguageId": 1,
  "language": "en",
  "culture": "en-gb"
};

export interface ClientContext {
  companyCode: string;
  signedInClientId: number;
  clientId: number;
  permissionClientId: number;
  permissionRoleId: number;
  dataLanguageId: number;
  language: string;
  culture: string;
}

export interface LoginInfo {
  name: string;
  password: string;
}

export interface CompanyRole {
  company : string;
  role : string;
}
export interface StoreChangeEvent {
  name: string;
  value: any;
}

export class CoreStore {
  private _api: any;

  private _time: number;

  private _server: string = '';

  private _clientContext: ClientContext = CONTEXT;

  private _authentication: string = '';

  private _loginInfo: LoginInfo = null;

  private _user: any = null;

  private _headers: HttpHeaders = new HttpHeaders();

  private _language: string = '';

  private _isShowWelcome: boolean = null;

  private _lastAppVersion: string = null;

  private _enableProfile: boolean = null;

  private _companyRole : CompanyRole = null;

  public onChange: EventEmitter<StoreChangeEvent> = new EventEmitter<StoreChangeEvent>();

  public tokenExpire: EventEmitter<boolean> = new EventEmitter<boolean>();

  get api() {
    return deepCopy(this._api);
  }
  set api(api) {
    this._api = api;
  }

  get time() {
    return deepCopy(this._time);
  }
  set time(time) {
    this._time = time;
  }

  get headers() {
    return this._headers;
  }
  set headers(headers) {
    this._headers = headers;
  }

  set server(server) {
    this._server = server;
    this.onChange.emit({
      name: 'server',
      value: server
    });
  }
  get server() {
    return deepCopy(this._server);
  }

  set clientContext(context) {
    this._clientContext = context;
    this.onChange.emit({
      name: 'clientContext',
      value: context
    });
  }
  get clientContext() {
    return deepCopy(this._clientContext);
  }

  set authentication(token) {
    this._authentication = token;
    this.onChange.emit({
      name: 'authentication',
      value: token
    });
  }
  get authentication() {
    return deepCopy(this._authentication);
  }

  set loginInfo(loginInfo) {
    this._loginInfo = loginInfo;
    this.onChange.emit({
      name: 'loginInfo',
      value: loginInfo
    });
  }
  get loginInfo() {
    return deepCopy(this._loginInfo);
  }

  set user(user: any) {
    this._user = user;
    this.onChange.emit({
      name: 'user',
      value: user
    });
  }
  get user() {
    return deepCopy(this._user);
  }

  set language(lang: string) {
    this._language = lang;
    this.onChange.emit({
      name: 'language',
      value: lang
    });
  }
  get language() {
    return deepCopy(this._language);
  }

  get isShowWelcome() {
    return deepCopy(this._isShowWelcome);
  }
  set isShowWelcome(show : boolean) {
    this._isShowWelcome = show;
    this.onChange.emit({
      name: 'isShowWelcome',
      value: show
    });
  }
  get lastAppVersion() {
    return deepCopy(this._lastAppVersion);
  }
  set lastAppVersion(data : string) {
    this._lastAppVersion = data;
    this.onChange.emit({
      name: 'lastAppVersion',
      value: data
    });
  }

  get enableProfile() {
    return deepCopy(this._enableProfile);
  }
  set enableProfile(enable : boolean) {
    this._enableProfile = enable;
    this.onChange.emit({
      name : 'enableProfile',
      value : enable
    })
  }

  get companyRole() {
    return deepCopy(this._companyRole);
  }
  set companyRole(data : CompanyRole) {
    this._companyRole = data;
    this.onChange.emit({
      name : 'companyRole',
      value : data
    });
  }
  reset() {
    this.clientContext = CONTEXT;
    this.authentication = '';
    this.loginInfo = null;
    this.user = null;
    this.headers = new HttpHeaders();
  }

  new(property: string) {
    let name = `_${property}`;
    Object.defineProperty(this, property, { 
      set: (data: any) => {
        this[name] = data;
        this.onChange.emit({
          name: property,
          value: data
        });
      },
      get: () => {
        return this[name];
      },
      enumerable:true,
      configurable:true
    });
  }
}