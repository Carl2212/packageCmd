import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


import { NavStack, AuthService, Auth, Desktop, Setting, Blank, Welcome, WelcomeController } from "mobility-lib";

import { LeftNav } from "../pages/leftNav/leftNav";
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})

export class App {
  @ViewChild('root') root: NavController;
  rootPage: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private navStack: NavStack,
    private authService: AuthService,
    private welcomeCtrl: WelcomeController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then((readySource) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log('Platform ready from', readySource);
      this.statusBar.overlaysWebView(true);
    });

  }

  ngAfterViewInit() {
    this.navStack.rootNav = this.root;
    this.root.viewDidEnter.subscribe(data => {
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    if (this.welcomeCtrl.isShowWelcome()) {
      this.root.setRoot(Welcome);
      this.welcomeCtrl.leavePage
        .subscribe(isPop => {
          this.isLogin();
        });
    } else {
      this.isLogin();
    }

    this.authService.stateChange
      .subscribe((state: number) => {
        if (state === 3){
        this.root.setRoot(Desktop, {
          left: LeftNav,
          content: HomePage,
          right: Setting
        });
        }
      });
  }

  isLogin() {
    let token = this.authService.checkToken();
    if(token) {
      let content: Component = Blank;
      this.pushToDeskTop(content);
    }else{
      this.root.setRoot(Auth);
    }
  }

  pushToDeskTop(content: Component) {
    this.root.setRoot(Desktop, {
      left: LeftNav,
      content: content,
      right: Setting
    });
  }
}


