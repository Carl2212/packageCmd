
import { Injectable } from "@angular/core";
import { AccountManager } from "./accountManager";
import { DeviceService } from "../device.service";
@Injectable()
export class ProfileShareService {
  private _accountType : string;
  private _group : string;

  private _resName : string = 'value';

  constructor(
    private accountManager : AccountManager,
    private deviceService : DeviceService
  ) {}

  initResName(res : string) {
    this._resName = res;
  }
  /**
   * init shareIdentity
   * for android accountType is config.xml <preference name="AccountManagerType" value="com.two.mobility.shareData" /> the value
   * for ios accountType is service , multiple app must be access the same service
   * for ios group is accessgroup .[appID.prefix].[string] multiple app must be same accessgroup for sharing data
   * @param accountType
   * @param group
   */
  initPlatform(encryptionKey : string , accountType : string , group? : string) {
    this._accountType = accountType;
    this._group = group;
    //android
    //同步本地与存储
    //本地是否有数据 ， 存储是否有数据
    //ios
    //是否是第一次安装app 是 查看储存的profile里面使用app是否在本系统上，
    return this.accountManager.initWithKey(encryptionKey);
  }
  //上一步的处理结果
  handleResult(...arg : Array<any>) : Promise<any> {
    let res = arg[1] ? arg[1] : arg[0];
    let key = arg[1] ? arg[0] : this._resName;
    return new Promise((resolve, reject)=>{
      if(res[key]) resolve(res[key]);
      reject("No Data");
    });
  }
  /**
   * register account
   * @param userName
   * @param password
   * @param userData
   * @returns {Promise<any>}
   */
  registerAccount(userName : string, password : string, userData? : any) : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve)=>{
        localStorage.setItem('profile' , JSON.stringify({userName : userName ,password : password}));
        localStorage.setItem(`profile@${userName}` , JSON.stringify({userData : userData}));
        resolve(true);
      });
    }
    return this.accountManager.registerAccount(userName, password, this._accountType , this._group ,userData);
  }

  /**
   * the method is only useful of ios
   * it will remove service's all account
   * @param accountType
   * @returns {Promise<any>}
   */
  removeAccount(accountType : string) : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve)=>{
        let user = JSON.parse(localStorage.getItem('profile'));
        localStorage.removeItem(`profile`);
        localStorage.removeItem(`profile@${user.userName}`);
        resolve(true);
      });
    }
    return this.accountManager.removeAccount(accountType);
  }

  /**
   * successData : {key : username} //yes,key is your import
   * @param key
   * @returns {Promise<any>}
   */
  getUserAccount() : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve)=>{
        let res = JSON.parse(localStorage.getItem('profile'));
        resolve(res.userName);
      });
    }
    return this.accountManager.getUserAccount(this._accountType, this._group, this._resName).then(this.handleResult.bind(this));
  }

  /**
   * successData : {key : password} //yes,key is your import
   * @param key
   * @returns {Promise<any>}
   */
  getPassword() : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve)=>{
        let res = JSON.parse(localStorage.getItem('profile'));
        resolve(res.password);
      });
    }
    return this.accountManager.getPassword(this._accountType, this._group, this._resName).then(this.handleResult.bind(this));
  }

  /**
   * get user data for key .the key is jsonData 's key
   * such as setUserData({name : xxxx , age : 111}) And getDataFromKey('name'/'age')；
   * successData : {name : xxxx}  | {age : 111}
   * @param key
   * @returns {Promise<any>}
   */
  getDataFromKey(key : string) : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve,reject)=>{
        let user = JSON.parse(localStorage.getItem('profile'));
        if(!user) {
          reject(null);
        }
        let res = JSON.parse(localStorage.getItem(`profile@${user.userName}`));
        res[key] ? resolve(JSON.stringify(res[key])) : reject(null);
      });
    }
    return this.accountManager.getDataFromKey(this._accountType, this._group, key).then(this.handleResult.bind(this,key));
  }

  /**
   * set user data.data must be json
   * @param data : json
   * @returns {Promise<any>}
   */
  setUserData(data : {[key: string] : any}) : Promise<any> {
    if(!this.deviceService.isCordova()) {
      return new Promise<any>((resolve)=>{
        let user = JSON.parse(localStorage.getItem('profile'));
        for(let i in data) {
          data[i] = JSON.parse(data[i]);
        }
        localStorage.setItem(`profile@${user.userName}` , JSON.stringify(data));
        resolve(data);
      });
    }
    return this.accountManager.setUserData(this._accountType, this._group, data);
  }

}