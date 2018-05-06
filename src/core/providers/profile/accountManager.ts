import { Injectable } from "@angular/core";
import { Plugin, IonicNativePlugin, Cordova } from "@ionic-native/core";

@Plugin({
  pluginName :'AccountManager',
  plugin : 'cordova-plugin-kunder-accountmanager',
  pluginRef : 'AccountManager',
  platforms : ['Android' , 'iOS']
})
@Injectable()
export class AccountManager extends IonicNativePlugin {

  @Cordova({
    successIndex : 1,
    errorIndex : 2
  })
  initWithKey(encryptionKey : string) : Promise<any> {return;}

  @Cordova({
    successIndex : 5,
    errorIndex : 6
  })
  registerAccount(userName : string, password : string, accountType : string, group : string, userData? : any) : Promise<any> {return;}

  /**
   *  remove an account from Account Manager (Android) and remove all data from keychain (iOS)
   * @param accountType
   */
  @Cordova({
    successIndex : 1,
    errorIndex : 2
  })
  removeAccount(accountType : string) : Promise<any> {return;}
  @Cordova({
    successIndex : 3,
    errorIndex : 4
  })
  getUserAccount(accountType : string, group : string, returnKey : string) : Promise<any> {return;}

  @Cordova({
    successIndex : 3,
    errorIndex : 4
  })
  getPassword(accountType : string, group : string, key : string) : Promise<any> {return;}

  @Cordova({
    successIndex : 3,
    errorIndex : 4
  })
  getDataFromKey(accountType : string, group : string, key : string) : Promise<any> {return;}
  @Cordova({
    successIndex : 3 ,
    errorIndex : 4
  })
  setUserData(accountType : string, group : string, data : any) : Promise<any> {return;}

  @Cordova({
    successIndex : 3 ,
    errorIndex : 4
  })
  setPassword(accountType : string, group : string, newPassword : string) : Promise<any> {return;}

  @Cordova({
    successIndex : 2 ,
    errorIndex : 3
  })
  resetPassword(accountType : string, group : string) : Promise<any> {return;}

}
