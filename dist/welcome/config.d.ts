import { InjectionToken } from '@angular/core';
export interface welcomeItemStruct {
    topImg?: string;
    appName?: string;
    title?: string;
    description?: string;
    isGetStartBtn?: boolean;
    startBtnText?: string;
    bottomImg?: string;
}
export declare const WELCOMECONFIG: InjectionToken<any>;
