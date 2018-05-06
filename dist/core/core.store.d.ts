import { HttpHeaders } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
export declare const CONTEXT: {
    "companyCode": string;
    "signedInClientId": number;
    "clientId": number;
    "permissionClientId": number;
    "permissionRoleId": number;
    "dataLanguageId": number;
    "language": string;
    "culture": string;
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
    company: string;
    role: string;
}
export interface StoreChangeEvent {
    name: string;
    value: any;
}
export declare class CoreStore {
    private _api;
    private _time;
    private _server;
    private _clientContext;
    private _authentication;
    private _loginInfo;
    private _user;
    private _headers;
    private _language;
    private _isShowWelcome;
    private _lastAppVersion;
    private _enableProfile;
    private _companyRole;
    onChange: EventEmitter<StoreChangeEvent>;
    tokenExpire: EventEmitter<boolean>;
    api: any;
    time: any;
    headers: HttpHeaders;
    server: any;
    clientContext: any;
    authentication: any;
    loginInfo: any;
    user: any;
    language: string;
    isShowWelcome: boolean;
    lastAppVersion: string;
    enableProfile: boolean;
    companyRole: CompanyRole;
    reset(): void;
    new(property: string): void;
}
