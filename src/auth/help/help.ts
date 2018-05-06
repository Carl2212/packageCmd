import { Component } from '@angular/core';
import { NavParams } from "ionic-angular";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'help',
  template: `
    <ion-header no-border>
      <ion-navbar hideBackButton="true" color="primary">
        <ion-buttons end>
          <button ion-button clear icon-only color="light" navPop>
            <ion-icon name="close-circle-filled"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title text-left>{{'auth.serverSetting' | translate}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content class="bg-lightblue">
      <ion-row justify-content-center padding-horizontal class="bg-primary">
        <ion-col col-md-10 col-md-10 align-self-center>
          <ion-label color="white"><ion-icon name="hand"></ion-icon><b class="has-icon">{{'help.manualInput' | translate}}</b></ion-label>
          <div>{{tlService.instant('help.forCorrect', {key: tlService.instant(company)})}}</div>
          <div class="border-div">
            {{tlService.instant('help.forExample', {key: tlService.instant(company)})}}
            <div margin-bottom>http://ribsoftware.com.itwo4.0/xyz/<span class="yell">client</span></div>
            {{'help.exampleThen' | translate}}
            <div>http://ribsoftware.com.itwo4.0/xyz/</div>
          </div>

          <ion-label color="white"><ion-icon name="scan"></ion-icon><b class="has-icon">{{'auth.scan' | translate}}</b></ion-label>
          <ion-row justify-content-center no-padding padding-bottom>
            <ion-col col-8 no-padding>
              <div class="border-div">
                {{tlService.instant('help.scanCode', {key: tlService.instant(company)})}}
              </div>
            </ion-col>
            <ion-col col-4 align-self-center no-padding>
              <div class="img-label">
                <div class="label-top"></div>
                <div class="label-bottom"></div>
                <img src="assets/help.png">
              </div>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
      <ion-row justify-content-center class="bg-lightblue" padding-horizontal>
        <ion-col col-md-10 col-md-10 align-self-center>
          <ion-label color="primary"><b>{{'help.loginCredentials' | translate}}</b></ion-label>
          <p>{{tlService.instant('help.logInUse', {key: tlService.instant(company)})}}</p>
          <p>{{tlService.instant('help.ifYou', {key: tlService.instant(company)})}}</p>
        </ion-col>
      </ion-row>
    </ion-content>
  `,
})
export class Help {
  company: string;

  constructor(
    private tlService: TranslateService,
    private navParams: NavParams) {
      this.company = this.navParams.get('company');
  }
}