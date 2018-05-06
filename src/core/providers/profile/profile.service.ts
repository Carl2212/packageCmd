import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { deepEqual, deepCopy } from "ionic-angular/es2015/util/util";

import { CoreStore } from "../../core.store";
import { ProfileShareService } from "./profileShare.service";
import { ProfileStore, profileStruct, PROFILETICKET } from "./profile.store";
import { NativeStorage } from "@ionic-native/native-storage";
import { Platform } from "ionic-angular";

@Injectable()
export class ProfileService {

  private encryptionKey: string = 'MobilityProfile';
  private accountName: string = 'ItwoProfile';
  private accountPassword: string = 'PROFILE';
  private accountType: string = 'com.two.mobility.shareAccount';//
  private group: string = 'R3XEVK9SPG.com.two.mobility.shareAccount';

  private _profilegroup: Array<profileStruct>;
  private _loginProfileName: string;
  private _actionIndex: number;

  public checkCompanySuccess = new EventEmitter();

  public profileDataKey : Array<string>= ['loginProfileName','profilegroup'];

  constructor(
    private pfStore: ProfileStore,
    private http: HttpClient,
    private profileShareService: ProfileShareService,
    private store : CoreStore,
    private nativeStorage : NativeStorage,
    private platform : Platform
  ) {
  }
  get profilegroup() {
    return this._profilegroup;
  }
  get loginProfileName() {
    return this._loginProfileName;
  }
  //before all store usage
  load() : Promise<boolean> {
    return new Promise<boolean>((resolve)=>{
      if(this.store.enableProfile) {
        this.init().then(
          (data) => {
            let profile = this._profilegroup
              .find((p) => p.name == this._loginProfileName);
            if (profile && profile.authentication != this.store.authentication) {
              for (let k in profile) {
                this.store[k] = profile[k];
              }
            }
            resolve(true);
          },
          (err) => resolve(true)
        );
      }else{
        resolve(true);
      }
    });
  }

  init() : Promise<any> {
    return new Promise<any>((resolve,reject)=>{
      this.profileShareService.initPlatform(this.encryptionKey, this.accountType, this.group);

      let promiseArray = [];
      this.profileDataKey.forEach(key => {
        let promise = this.profileShareService.getDataFromKey(key);
        promiseArray.push(promise);
        promise.then(
          data =>this[`_${key}`] = JSON.parse(data),
          err => this[`_${key}`] = null
        );
      });
      return this.profileShareService.getUserAccount()
        .then(()=>Promise.all(promiseArray))
        .then((data)=>{
          console.log('registerAccount',data);
          this.backups();
          resolve(data);
        },(error)=>{
          console.log('registerAccount',error);
          this.profileShareService.registerAccount(this.accountName , this.accountPassword)
            .then((data)=>{
              console.log('registerAccount',data);
              this.restoreBackups();
            });
          reject(error);
        });
    });

  }

  restoreBackups() {
    if(this.platform.is('android')) {
      this.nativeStorage.getItem(this.accountName)
        .then(data=>{
          if(data) {
            this.profileShareService
              .setUserData(data)
              .then(()=>this.init())
          }
        },err=>{
          console.log(err);
        });
    }
  }

  backups() {
    if(this.platform.is('android')) {
      let data = {};
      this.profileDataKey.forEach((v)=>{
        data[v] = JSON.stringify(this[`_${v}`])
      });
      this.nativeStorage.setItem(this.accountName , data);
    }
  }

  setProfileData() : Promise<any> {
    let data = {};
    this.profileDataKey.forEach((v)=>{
      data[v] = JSON.stringify(this[`_${v}`])
    });
    return this.profileShareService
      .setUserData(data);
  }

  createProfile(profile: profileStruct = null) {
    //激发一个实例
    this._actionIndex = null;
    this.pfStore.init(profile);
    if (profile && profile.name) {
      this._actionIndex = this._profilegroup.findIndex(p=>p.name == profile.name);
    }
  }

  saveProfile() : Promise<any>{
    let store = this.pfStore.getCurrentStruct();
    if(this.isUnique(store , this.getUniqueCompareProfilegroup()) > -1) {
      return new Promise<any>((resolve, reject)=>reject(1));
    }
    let promise: Promise<any>;
    if(this.pfStore.userAction != 'company') {
      //checklogin
      promise = this.checklogin(this.pfStore.server,this.pfStore.loginName ,this.pfStore.password);
      //checkcompany
      if(this.pfStore.clientContext) {
        let l = this.pfStore.clientContext;
        promise = promise.then(()=>
          this.checkCompany(l.companyCode,l.signedInClientId,l.clientId,l.permissionRoleId));
      }
    }
    //setUser
    if(promise) {
      promise = promise.then(()=>this.setUser());
    }else {
      promise = this.setUser();
    }
    //setProfileData
    promise.then((data)=>{
      store = this.pfStore.getCurrentStruct();
      this._profilegroup = this._profilegroup || [];
      this._actionIndex = this._actionIndex || this.profilegroup.length;
      this._profilegroup[this._actionIndex] =store;
      this.setProfileData();
    }).catch(err=>{console.log(err)});
    return promise;
  }

  delProfile(profile? : profileStruct) : Promise<any> {
    if(!profile) {
      this._profilegroup = null;
      this._loginProfileName = null;
      return this.profileShareService.removeAccount(this.accountType);
    }else{
      let index = this.profilegroup.findIndex(p=>p.name == profile.name);
      this.profilegroup.splice(index ,1);
      return this.setProfileData();
    }

  }

  getUniqueCompareProfilegroup() {
    if(this._actionIndex) {
      let p = deepCopy(this._profilegroup);
      p.splice(this._actionIndex , 1);
      return p;
    }
    return this._profilegroup;
  }

  login(profile : profileStruct){
    profile.authentication = this.store.authentication;
    this._loginProfileName = profile.name;
    return this.setProfileData()
  }

  resetLogin() {
    this._loginProfileName = null;
  }

  checklogin(server: string, username: string, password: string): Promise<any> {
    let params = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.http.get(`login${PROFILETICKET}`, {params})
      .toPromise()
      .then((res: any) => new Promise((resolve) => {
          this.setToken(res);
          resolve(res);
        })
      );
  }

  setCompanyRole(company : string , role : string){
    this.pfStore.company = company;
    this.pfStore.role = role;
  }

  checkCompany(companyCode: string, companyId: number, clientId: number, roleId: number): Promise<any> {
    let context = this.pfStore.clientContext;
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

    return this.http.get(`checkCompany${PROFILETICKET}`, {params})
      .toPromise()
      .then((res: any)=>new Promise((resolve)=>{
        if (res.isValid) {
          this.pfStore.clientContext = context;
          this.setHeader();
          this.checkCompanySuccess.emit(true);
          resolve(true);
        } else {
          resolve(false);
        }
      }));
  }

  checkContext() {
    let context = this.pfStore.clientContext;
    if (context && context['signedInClientId'] !== 0) {
      return {
        clientId: context['signedInClientId'],
        roleId: context['permissionRoleId']
      };
    } else {
      return false;
    }
  }

  getUser() {
    return this.pfStore.user;
  }

  setUser() : Promise<any> {
    return new Promise<any>((resolve , reject)=>{
      this.http.get('userInfo')
        .subscribe(
          user=> {
            this.pfStore.user = user;
            resolve(true);
          },
          err=> {
            reject(err);
          }
        );
    });
  }

  private setToken(token: string) {
    this.pfStore.authentication = token;
    this.setHeader();
  }

  private getSessionToken(token: any) {
    return `Bearer ${token}`;
  }

  private setHeader() {
    let context = this.pfStore.clientContext;
    let token = this.pfStore.authentication || null;
    if (token) {
      token = this.getSessionToken(token);
    }
    let headers = new HttpHeaders()
      .set("Client-Context", JSON.stringify(context))
      .set('Authorization', token);
    this.pfStore.headers = headers;
  }

  private isUnique(profile : profileStruct , sourceProfiles : Array<profileStruct> = this._profilegroup) {
    sourceProfiles = sourceProfiles || [];
    let index = sourceProfiles.findIndex((p)=>{
      return (
        deepEqual(p.loginInfo , profile.loginInfo)&&
        p.server == profile.server &&
        p.clientContext.clientId == profile.clientContext.clientId &&
        p.clientContext.permissionRoleId == profile.clientContext.permissionRoleId
      )
    });
    return index;
  }
}


