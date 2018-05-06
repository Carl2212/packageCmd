import { NavController, NavParams, Config } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NavStack } from '../core/providers/nav.service';
export declare class Desktop {
    private navStack;
    private navParams;
    private keyboard;
    private config;
    left: NavController;
    content: NavController;
    right: NavController;
    leftPage: any;
    contentPage: any;
    rightPage: any;
    constructor(navStack: NavStack, navParams: NavParams, keyboard: Keyboard, config: Config);
    ngAfterViewInit(): void;
}
