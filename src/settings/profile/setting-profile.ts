
import { Component, ViewChild } from '@angular/core';
import { Profile } from "./profile";
import { NavController } from "ionic-angular";
@Component({
  template: `
    <ion-header>
      <setting-navbar></setting-navbar>
      <button ion-button full clear color="light" no-margin no-padding (click)="navpop()">
      </button>
    </ion-header>
    <ion-content>
      <ion-nav #profileNav [root]="rootPage" class="disable-env-top"></ion-nav>
    </ion-content>
  `,
  styles : [`
    ion-header > button{
      position: absolute;
      left :0;
      top :0;
      z-index:999;
    }
  `]
})

export class SettingProfile {

  @ViewChild('profileNav') profileNav : NavController
  rootPage : Component = Profile;

  constructor(
    private navCtrl : NavController
  ){}
  navpop() {
    if(this.profileNav.length() > 1) {
      this.profileNav.pop();
    }else{
      this.navCtrl.pop();
    }

  }
}
