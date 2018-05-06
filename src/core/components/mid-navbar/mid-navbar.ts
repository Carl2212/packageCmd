import { Component, Input } from '@angular/core';

@Component({
  selector: 'mid-navbar',
  template: `
    <ion-navbar color="primary" hideBackButton="true"  class="enable-env-top disable-env-left">
      <ion-buttons start>
        <button *ngIf="!directiveType" ion-button menuBtn="left" clear color="light" icon-only>
          <ion-icon name="menu"></ion-icon>
        </button>
        <button [class.active]="!!directiveType" ion-button menuToggle clear color="light" icon-only>
          <ion-icon name="menu"></ion-icon>
        </button>
      </ion-buttons>
      <ion-title>{{title | translate}}</ion-title>
    </ion-navbar>
  `,
  styles: [`button.active { display: block!important;}`]
})
export class MidNavbar {
  @Input() title: string;
  @Input() directiveType: string;
  constructor() {
  }

  ngOnInit(){

  }

}

