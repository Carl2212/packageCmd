import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { DesService } from '../core/providers/des.service';
import { CompanyRole, CoreStore } from '../core/core.store';
import { profileStruct } from "../core/providers/profile/profile.store";

@Injectable()
export class AuthService {
  state: number;
  stateChange = new EventEmitter();

  constructor(
    private desService: DesService,
    private http: HttpClient,
    private store: CoreStore) {
      this.setHeader();
      this.setState();
  }

  private setState() {
    this.state = 1;
    if(this.checkContext()) {
      this.state = 3;
    } else if(this.checkServer()) {
      this.state = 2;
    }
  }

  private setHeader() {
    let context = this.store.clientContext;
    let token = this.store.authentication || null;
    if(token) {
      token = this.getSessionToken(token);
    }
    let headers = new HttpHeaders()
      .set("Client-Context", JSON.stringify(context))
      .set('Authorization', token);
    this.store.headers = headers;
  }

  checkServer(): boolean {
    console.log(this.store.user , this.store.server);
    if(this.store.server) {
      return true;
    } else {
      console.log('checkServer',this.store.server);
      return false;
    }
  }

  setServer(server: string) {
    this.store.server = server;
  }

  getServer() {
    return this.store.server;
  }

  checkToken(): boolean {
    let token = this.store.authentication;
    if(token) {
      return true;
    } else {
      return false;
    }
  }

  private setToken(token: string) {
    this.store.authentication = token;
    this.setHeader();
  }
  
  private getSessionToken(token: any) {
    return `Bearer ${token}`;
  }

  login(username: string, password: string): Promise<any> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return new Promise ((resolve,reject) => {
      this.http.get('login', {params})
        .subscribe((res: any) => {
          this.setToken(res);
          this.state = 2;
          this.stateChange.emit(2);
          resolve(res);
        }, (err: any) => {
          reject(err);
        });
    });
  }

  logout() {
    this.store.reset();
  }

  getUser() {
    return this.store.user;
  }

  setUser() {
    this.http.get('userInfo')
      .subscribe(user => {
        this.store.user = user;
      });
  }

  setLoginInfo(user?: { name: string, password: string }) {
    if(user) {
      let encodePwd: string = user.password;
      if(user.password.length <= 20) {
        encodePwd = this.desService.encrypt(user.password);
      }
      let loginInfo = {
        name: user.name, 
        password : encodePwd
      };
      this.store.loginInfo = loginInfo;
    } else {
      this.store.loginInfo = null;
    }
  }

  getLoginInfo() {
    let info = this.store.loginInfo;
    if(info && info.password) {
      info.password = this.desService.decrypt(info.password);
    }
    return info;
  }

  setCompanyRole(company : string , role : string) {
    this.store.companyRole = {
      company : company ,
      role : role
    }
  }

  getCompanyRole() :CompanyRole {
    return this.store.companyRole;
  }

  checkCompany(companyCode: string, companyId: number, clientId: number, roleId: number): Promise<any> {
    let context = this.store.clientContext;
    context.companyCode = companyCode;
    context.signedInClientId = companyId;
    context.clientId = clientId;
    context.permissionClientId = clientId;
    context.permissionRoleId = roleId;

    let params = new HttpParams()   
      .set('requestedCompanyId', clientId.toString())
      .set('requestedPermissionClientId', clientId.toString())
      .set('requestedSignedInCompanyId', companyId.toString())
      .set('requestedRoleId', roleId.toString());

    return new Promise ((resolve,reject) => {
      this.http.get('checkCompany', {params})
        .subscribe((res: any) => {
          if(res.isValid) {
            resolve(true);
            this.state = 3;
            if(this.checkContext()) {
              this.stateChange.emit(32);
            } else {
              this.stateChange.emit(this.state);
            }
            this.store.clientContext = context;
            this.setHeader();
          } else {
            resolve(false);
          }
        }, (err: any) => {
          reject(err);
        });
    });
  }

  checkContext() {
    let context = this.store.clientContext;
    if(context && context['signedInClientId'] !== 0) {
      return {
        clientId: context['signedInClientId'],
        roleId: context['permissionRoleId']
      };
    } else {
      return false;
    }        
  }

  changeLang(language: string, culture: string) {
    let context = this.store.clientContext;
    context.language = language;
    context.culture = culture;
    this.store.clientContext = context;
    this.store.language = language;
    //this.setHeader();
  }

  //登录或者切换账号
  loginWithProfile(profile : profileStruct) : Promise<any> {
    this.setServer(profile.server);
    let password = this.desService.decrypt(profile.loginInfo.password);
    return this.login(profile.loginInfo.name , password)
      .then(()=>{
        if(profile.clientContext.companyCode){
          let {companyCode , signedInClientId , clientId , permissionRoleId} = profile.clientContext;
          return this.checkCompany(companyCode , signedInClientId , clientId , permissionRoleId)
        }else{
          return new Promise((resolve)=>{resolve(true)});
        }
      })
      .then(()=>new Promise<any>((resolve)=>{
        this.setUser();
        this.setLoginInfo(profile.loginInfo);
        this.setCompanyRole(profile.companyRole.company , profile.companyRole.role);
        resolve(true);
      }));
  }
}