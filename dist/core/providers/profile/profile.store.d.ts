import { HttpHeaders } from "@angular/common/http";
import { ClientContext, CompanyRole, LoginInfo } from "../../core.store";
import { DesService } from "../des.service";
export declare const PROFILETICKET = "@PROFILETICKET";
export interface profileStruct {
    name: string;
    user: any;
    loginInfo: LoginInfo;
    server: string;
    companyRole: CompanyRole;
    authentication: string;
    clientContext: ClientContext;
}
export declare class ProfileStore {
    private desService;
    private _name;
    private _user;
    private _loginName;
    private _password;
    private _server;
    private _company;
    private _role;
    private _headers;
    private _clientContext;
    private _authentication;
    private _userAction;
    constructor(desService: DesService);
    init(profile?: profileStruct): void;
    reset(): void;
    name: string;
    user: any;
    loginName: string;
    password: string;
    server: string;
    company: string;
    role: string;
    headers: HttpHeaders;
    authentication: string;
    clientContext: ClientContext;
    readonly userAction: string;
    getCurrentStruct(): profileStruct;
}
