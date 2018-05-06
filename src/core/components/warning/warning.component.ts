import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'warning',
  template: `
    <div text-center padding-top margin-top>
      <ion-label color="darkgray" *ngIf="msg">{{msg | translate}}</ion-label>
      <button ion-button color="primary" icon-only (click)="pushBtn()" *ngIf="!btn">
        <ion-icon name="refresh"></ion-icon>
      </button>
      <button ion-button color="primary" icon-only (click)="pushBtn()" *ngIf="btn">
        <ion-icon name="plus"></ion-icon>
      </button>
    </div>
  `
})
export class WarningComponent {
  @Input() msg: string;
  @Input() btn: string;
  @Output() event = new EventEmitter();

  constructor() {

  }

  pushBtn() {
    this.event.next();
  }
}