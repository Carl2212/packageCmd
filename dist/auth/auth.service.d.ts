import { EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DesService } from '../core/providers/des.service';
import { CompanyRole, CoreStore } from '../core/core.store';
import { profileStruct } from "../core/providers/profile/profile.store";
export declare class AuthService {
    private desService;
    private http;
    private store;
    state: number;
    stateChange: EventEmitter<{}>;
    constructor(desService: DesService, http: HttpClient, store: CoreStore);
    private setState();
    private setHeader();
    checkServer(): boolean;
    setServer(server: string): void;
    getServer(): any;
    checkToken(): boolean;
    private setToken(token);
    private getSessionToken(token);
    login(username: string, password: string): Promise<any>;
    logout(): void;
    getUser(): any;
    setUser(): void;
    setLoginInfo(user?: {
        name: string;
        password: string;
    }): void;
    getLoginInfo(): any;
    setCompanyRole(company: string, role: string): void;
    getCompanyRole(): CompanyRole;
    checkCompany(companyCode: string, companyId: number, clientId: number, roleId: number): Promise<any>;
    checkContext(): false | {
        clientId: any;
        roleId: any;
    };
    changeLang(language: string, culture: string): void;
    loginWithProfile(profile: profileStruct): Promise<any>;
}
