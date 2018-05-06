import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CoreStore } from '../../core.module';

import { DeviceService } from '../../providers/device.service';

@Component({
  selector: 'left-navbar',
  template: `
    <ion-navbar color="darkblue" no-border hideBackButton="true" class="enable-env-top disable-env-left">
      <ion-buttons start>
        <button ion-button clear color="light" icon-only (click)="next()">
          <avatar [name]="name?name:(store?.user?.UserName)"></avatar>
          <span padding-left>{{name?name:(store?.user?.UserName)}}</span>
        </button>
      </ion-buttons>
      <ion-buttons end>
        <button ion-button clear color="light" icon-only menuBtn="left" *ngIf="dvService.isMobile()&&!directiveType">
          <ion-icon name="menu"></ion-icon>
        </button>
        <button [class.active]="!!directiveType" ion-button menuToggle clear color="light" icon-only>
          <ion-icon name="menu"></ion-icon>
        </button>
      </ion-buttons>
    </ion-navbar>
  `,
  styles: [`button.active { display: block!important;} 
            .bar-button-ios{height : auto}`]
})
export class LeftNavbar {
  @Input() name: string;
  @Input() directiveType: string;
  @Output() leftBtn = new EventEmitter();
  
  constructor(
    public dvService: DeviceService,
    private store: CoreStore) {

  }

  next() {
    this.leftBtn.next('click');
  }


  ngOnInit() {

  }
}

