import { InjectionToken } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { AuthService } from './auth.service';
export interface AuthConfig {
    logoUrl?: string;
    twoUrl?: string;
    appName?: string;
    loginState?: number;
    company?: string;
}
export declare const AUTH_CONFIG: InjectionToken<any>;
export declare class Auth {
    private navCtrl;
    private authService;
    private keyboard;
    private config;
    private authConfig;
    auth: NavController;
    loginPage: any;
    constructor(navCtrl: NavController, authService: AuthService, keyboard: Keyboard, config: Config, authConfig: Array<AuthConfig>);
    help(): void;
    setPage(): void;
    ngOnInit(): void;
}
