import { IonicNativePlugin } from "@ionic-native/core";
export declare class AccountManager extends IonicNativePlugin {
    initWithKey(encryptionKey: string): Promise<any>;
    registerAccount(userName: string, password: string, accountType: string, group: string, userData?: any): Promise<any>;
    /**
     *  remove an account from Account Manager (Android) and remove all data from keychain (iOS)
     * @param accountType
     */
    removeAccount(accountType: string): Promise<any>;
    getUserAccount(accountType: string, group: string, returnKey: string): Promise<any>;
    getPassword(accountType: string, group: string, key: string): Promise<any>;
    getDataFromKey(accountType: string, group: string, key: string): Promise<any>;
    setUserData(accountType: string, group: string, data: any): Promise<any>;
    setPassword(accountType: string, group: string, newPassword: string): Promise<any>;
    resetPassword(accountType: string, group: string): Promise<any>;
}
