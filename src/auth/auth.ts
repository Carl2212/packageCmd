import { Component, ViewChild, Inject, InjectionToken } from '@angular/core';
import { Config, NavController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

import { AuthService } from './auth.service';

import { Server } from './server/server';
import { Login } from './login/login';
import { Company } from './company/company';
import { Help } from './help/help';

export interface AuthConfig {
  logoUrl?:    string;
  twoUrl? :    string;
  appName?:    string;
  loginState?: number;
  company?:    string;
}

export const AUTH_CONFIG = new InjectionToken<any>('AUTH_CONFIG');

@Component({
  selector: 'auth',
  template:`
    <ion-content class="bg">
      <ion-row justify-content-center>
        <ion-col margin-horizontal no-padding text-right tappable (click)="help()">
          <ion-icon padding-top color="light" name="help-circle" class="help-icon"></ion-icon>
        </ion-col>
      </ion-row>
      <ion-row justify-content-center id="title">
        <ion-col col-lg-4 col-md-6 col-sm-7 align-self-center>
          <ion-row>
            <ion-col col-3 col-md-3 align-self-center text-right no-padding>
              <img [src]="authConfig?.logoUrl" id="logo">
            </ion-col>
            <ion-col text-center>
              <img [src]="authConfig?.twoUrl" id="itwo">
              <div id="app-name">{{authConfig?.appName | translate}}</div>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-row justify-content-center class="bx">
        <ion-col col-md-6 margin-horizontal>
          <ion-nav #login [root]="loginPage"></ion-nav>
        </ion-col>
      </ion-row>
    </ion-content>
  ` 
})

export class Auth {
  @ViewChild('login') auth: NavController;
  loginPage: any = null;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private keyboard: Keyboard,
    private config: Config,
    @Inject(AUTH_CONFIG) private authConfig : Array<AuthConfig>) {

  }

  help() {
    this.navCtrl.push(Help, {company: this.authConfig['company']});
  }

  setPage() {
    this.auth.push(Server, null, {animate: false});
    if(this.authService.state > 1) {
      this.auth.push(Login, null, {animate: false});
      if(!this.authConfig['loginState'] || this.authConfig['loginState'] && this.authConfig['loginState'] > 2) {
        if(this.authService.state >= 2 && this.authService.getUser()) {
          this.auth.push(Company, null, {animate: false});
        }
      }
    }
    this.keyboard.disableScroll(false);
    this.config.set('ios', 'scrollAssist', 'true');
    this.config.set('ios', 'autoFocusAssist', 'true');
  }

  ngOnInit() {
    this.setPage();
  }
}
