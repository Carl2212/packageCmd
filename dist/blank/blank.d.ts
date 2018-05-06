import { InjectionToken } from '@angular/core';
import { CoreStore } from '../core/core.store';
export declare const BLANK_CONFIG: InjectionToken<any>;
export interface BlankConfig {
    appName?: string;
    company?: string;
    desktop?: any;
}
export declare class Blank {
    blankConfig: Array<BlankConfig>;
    private store;
    constructor(blankConfig: Array<BlankConfig>, store: CoreStore);
}
