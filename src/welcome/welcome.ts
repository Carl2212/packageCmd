import { Component, Inject, ViewChild, Injectable, EventEmitter } from '@angular/core';
import { Slides } from "ionic-angular";
import { WELCOMECONFIG, welcomeItemStruct } from "./config";
import { CoreStore } from "../core/core.store";
@Injectable()
export class WelcomeController {
  leavePage: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private store: CoreStore
  ) {}

  isShowWelcome(): boolean {
    if (this.store.isShowWelcome) {
      return true;
    } else {
      return false;
    }
  }
}

@Component({
  selector: 'page-welcome',
  template: `
    <ion-slides pager>
      <ion-slide class="pager-slide" *ngFor="let l of slideDatas">
        <div class="title">
          <img [class.small-image]="l?.appName" *ngIf="l?.topImg" [src]="l?.topImg">
          <h2 class="appName" *ngIf="l?.appName">{{l?.appName | translate}}</h2>
        </div>
        <div class="description">
          <h2>{{l?.title | translate}}</h2>
          <p>{{l?.description | translate}}</p>
          <button ion-button class="slide-button" *ngIf="l?.isGetStartBtn" (click)="pushToMain()">
            {{l?.startBtnText | translate}}
          </button>
          <img class="bottom-image" *ngIf="l?.bottomImg" [src]="l?.bottomImg">
        </div>
      </ion-slide>
    </ion-slides>
  `,

})
export class Welcome {

  @ViewChild(Slides) slides: Slides;

  constructor(
    @Inject(WELCOMECONFIG) public slideDatas: Array<welcomeItemStruct>,
    private welcomeCtrl: WelcomeController
  ) {
  }

  private pushToMain() {
    this.welcomeCtrl.leavePage.emit(true);
  }
}
