

//profile 标示 用于在各种地方区分的字段
import { HttpHeaders } from "@angular/common/http";
import { ClientContext, CompanyRole, CONTEXT, LoginInfo } from "../../core.store";
import { Injectable } from "@angular/core";
import { DesService } from "../des.service";
import { deepCopy } from "ionic-angular/es2015/util/util";
export const PROFILETICKET = '@PROFILETICKET';
export interface profileStruct {
  name: string;
  user : any;
  loginInfo: LoginInfo;
  server: string;
  companyRole: CompanyRole;
  authentication: string;
  clientContext: ClientContext;
}

@Injectable()
export class ProfileStore {

  private _name: string;

  private _user: any;

  private _loginName: string;

  private _password: string;

  private _server: string;

  private _company: string;

  private _role: string;

  private _headers: HttpHeaders = new HttpHeaders();

  private _clientContext: ClientContext = CONTEXT;

  private _authentication: string = '';

  private _userAction : string;

  constructor(
    private desService : DesService
  ) {}

  init(profile?: profileStruct) {
    if(profile) {
      this._name = deepCopy(profile.name);
      this._server = deepCopy(profile.server);
      this._user = deepCopy(profile.user);
      this._loginName = deepCopy(profile.loginInfo.name);
      this._password = deepCopy(this.desService.decrypt(profile.loginInfo.password));
      this._company = deepCopy(profile.companyRole.company);
      this._role = deepCopy(profile.companyRole.role);
      this._clientContext = deepCopy(profile.clientContext);
      this._authentication = deepCopy(profile.authentication);
      this._headers = new HttpHeaders();
    }else{
      this.reset();
    }
    this._userAction = null;
  }

  reset() {
    this._name = null;
    this._server = null;
    this._user = null;
    this._loginName = null;
    this._password = null;
    this._company = null;
    this._role = null;
    this._headers = new HttpHeaders();
    this._clientContext = CONTEXT;
    this._authentication = '';
  }

  get name() {
    return this._name;
  }

  set name(data: string) {
    this._name = data;
  }

  get user() {
    return this._user;
  }

  set user(data: any) {
    this._user = data;
  }
  get loginName() {
    return this._loginName;
  }

  set loginName(data: string) {
    this._loginName = data;
    this._userAction = 'loginName';
  }
  get password() {
    return this._password;
  }

  set password(data: string) {
    this._password = data;
    this._userAction = 'password';
  }

  get server() {
    return this._server;
  }

  set server(data: string) {
    this._server = data;
    this._userAction = 'server';
  }

  get company() {
    return this._company;
  }

  set company(data: string) {
    this._company = data;
    this._userAction = 'company';
  }

  get role() {
    return this._role;
  }

  set role(data: string) {
    this._role = data;
  }

  get headers() {
    return this._headers;
  }

  set headers(data: HttpHeaders) {
    this._headers = data;
  }

  get authentication() {
    return this._authentication;
  }

  set authentication(data: string) {
    this._authentication = data;
  }

  get clientContext() {
    return this._clientContext;
  }

  set clientContext(data: ClientContext) {
    this._clientContext = data;
  }

  get userAction() {
    return this._userAction;
  }
  getCurrentStruct() : profileStruct{
    return {
      name: this.name,
      user : this.user,
      loginInfo : {name : this.loginName , password : this.desService.encrypt(this.password)},
      server: this.server,
      companyRole : {company : this.company , role : this.role},
      authentication: this.authentication,
      clientContext: this.clientContext
    }
  }
}
