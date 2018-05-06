import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Platform, NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';


import { NavStack } from "mobility-lib";

import { LeftNav } from "../pages/leftNav/leftNav";

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
    private navStack: NavStack
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
      this.root.setRoot(LeftNav);
  }
}


