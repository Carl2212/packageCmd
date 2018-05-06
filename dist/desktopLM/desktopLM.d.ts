import { NavController, NavParams, Config } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NavStack } from '../core/providers/nav.service';
export declare class DesktopLM {
    private navStack;
    private navParams;
    private keyboard;
    private config;
    left: NavController;
    content: NavController;
    leftPage: any;
    contentPage: any;
    constructor(navStack: NavStack, navParams: NavParams, keyboard: Keyboard, config: Config);
    ngAfterViewInit(): void;
}
