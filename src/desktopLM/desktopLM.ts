import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Config} from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NavStack } from '../core/providers/nav.service';

@Component({
  selector: 'desktop-l-m',
  template:  `
  <ion-menu [content]="content" persistent="true">
    <ion-nav [root]="leftPage" #left swipeBackEnabled="false"></ion-nav>
  </ion-menu>
  <ion-nav [root]="contentPage" #content swipeBackEnabled="false"></ion-nav>
  `
})

export class DesktopLM {
  @ViewChild('left') left: NavController;
  @ViewChild('content') content: NavController;

  leftPage: any;
  contentPage: any;

  constructor(
    private navStack: NavStack,
    private navParams: NavParams,  
    private keyboard: Keyboard,
    private config: Config) {
      this.leftPage = this.navParams.get('left');
      this.contentPage = this.navParams.get('content');
  }

  ngAfterViewInit () {
    this.navStack.leftNav = this.left;
    this.navStack.contNav = this.content;
    this.keyboard.disableScroll(true);
    this.config.set('ios', 'scrollAssist', 'false');
    this.config.set('ios', 'autoFocusAssist', 'false');
  }
}
