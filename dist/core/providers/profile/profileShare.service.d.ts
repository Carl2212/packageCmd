import { AccountManager } from "./accountManager";
import { DeviceService } from "../device.service";
export declare class ProfileShareService {
    private accountManager;
    private deviceService;
    private _accountType;
    private _group;
    private _resName;
    constructor(accountManager: AccountManager, deviceService: DeviceService);
    initResName(res: string): void;
    /**
     * init shareIdentity
     * for android accountType is config.xml <preference name="AccountManagerType" value="com.two.mobility.shareData" /> the value
     * for ios accountType is service , multiple app must be access the same service
     * for ios group is accessgroup .[appID.prefix].[string] multiple app must be same accessgroup for sharing data
     * @param accountType
     * @param group
     */
    initPlatform(encryptionKey: string, accountType: string, group?: string): Promise<any>;
    handleResult(...arg: Array<any>): Promise<any>;
    /**
     * register account
     * @param userName
     * @param password
     * @param userData
     * @returns {Promise<any>}
     */
    registerAccount(userName: string, password: string, userData?: any): Promise<any>;
    /**
     * the method is only useful of ios
     * it will remove service's all account
     * @param accountType
     * @returns {Promise<any>}
     */
    removeAccount(accountType: string): Promise<any>;
    /**
     * successData : {key : username} //yes,key is your import
     * @param key
     * @returns {Promise<any>}
     */
    getUserAccount(): Promise<any>;
    /**
     * successData : {key : password} //yes,key is your import
     * @param key
     * @returns {Promise<any>}
     */
    getPassword(): Promise<any>;
    /**
     * get user data for key .the key is jsonData 's key
     * such as setUserData({name : xxxx , age : 111}) And getDataFromKey('name'/'age')；
     * successData : {name : xxxx}  | {age : 111}
     * @param key
     * @returns {Promise<any>}
     */
    getDataFromKey(key: string): Promise<any>;
    /**
     * set user data.data must be json
     * @param data : json
     * @returns {Promise<any>}
     */
    setUserData(data: {
        [key: string]: any;
    }): Promise<any>;
}
