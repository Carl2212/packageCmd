import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ProfileService } from "../../core/providers/profile/profile.service";
import { CoreStore } from "../../core/core.store";
import { AuthService } from "../../auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { profileStruct } from "../../core/providers/profile/profile.store";
import { LoadingService } from "../../core/providers/loading.service";
export declare class Profile {
    private navCtrl;
    private pfService;
    private store;
    private authSerivice;
    private tlService;
    private alertCtrl;
    private settingService;
    private loading;
    addType: string;
    profileEdit: Component;
    constructor(navCtrl: NavController, pfService: ProfileService, store: CoreStore, authSerivice: AuthService, tlService: TranslateService, alertCtrl: AlertController, settingService: SettingsService, loading: LoadingService);
    static isFirstLoad(): boolean;
    ionViewDidLoad(): void;
    addTypeChange(type: any): void;
    del(profile: profileStruct): void;
    toggleProfile(profile: profileStruct): void;
    enableProfile($event: any): void;
}
