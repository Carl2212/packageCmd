import { InjectionToken } from "@angular/core";
import { CoreStore } from "../core/core.store";
export declare const SETTINGS_CONFIG: InjectionToken<any>;
export interface settingsConfig {
    about: aboutInfo;
    language?: Array<languagesStruct>;
    dynamicComponent?: any;
    privacyUrl?: string;
}
export interface aboutInfo {
    appName?: string;
    appLogo?: string;
    logoUrl?: string;
    company?: string;
    version?: string;
    copyright?: string;
    website?: string;
}
export interface languagesStruct {
    lang: string;
    culture: string;
}
export declare class SettingsService {
    configs: settingsConfig;
    private store;
    aboutInfo: aboutInfo;
    langList: Array<languagesStruct>;
    dynamicComponent: any;
    private _isFirstLaunch;
    privacyUrl: string;
    constructor(configs: settingsConfig, store: CoreStore);
    init(): void;
    isFirstLaunch: boolean;
}
