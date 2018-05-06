import { EventEmitter } from '@angular/core';
import { Slides } from "ionic-angular";
import { welcomeItemStruct } from "./config";
import { CoreStore } from "../core/core.store";
import { SettingsService } from "../settings/config";
export declare class WelcomeController {
    private store;
    private settingService;
    leavePage: EventEmitter<any>;
    constructor(store: CoreStore, settingService: SettingsService);
    isShowWelcome(): boolean;
}
export declare class Welcome {
    slideDatas: Array<welcomeItemStruct>;
    private welcomeCtrl;
    slides: Slides;
    constructor(slideDatas: Array<welcomeItemStruct>, welcomeCtrl: WelcomeController);
    private pushToMain();
}
