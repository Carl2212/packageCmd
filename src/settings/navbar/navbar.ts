import { Component } from '@angular/core';

@Component({
  selector: 'setting-navbar',
  template: `
    <ion-navbar color="darkblue" no-border hideBackButton="true" class="enable-env-top disable-env-left">
      <ion-buttons start>
        <button ion-button clear color="light" icon-only navPop>
          <ion-icon name="arrow-back-thin"></ion-icon>
        </button>
      </ion-buttons>
      <ion-title>{{'setting.setting' | translate}}</ion-title>
    </ion-navbar>
  `
})
export class SettingNavbar {
  translation: any = {};

  constructor() {
  }
}

