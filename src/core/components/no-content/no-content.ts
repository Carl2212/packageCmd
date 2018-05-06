import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div color="no-color" text-center margin-top>
      <div class="no-content-icon"><ion-icon name="{{warningIcon ? warningIcon : 'warning-circle'}}" color="icon-color" *ngIf="!btn"></ion-icon></div>
      <ion-label text-center padding-top>{{(msg ? msg : msgKey) | translate}}</ion-label>

      <button ion-fab color="primary" class="round-button" *ngIf="btn" (click)="refreshEvent()">
        <ion-icon name="refresh"></ion-icon>
      </button>
    </div>
  `,
  styles:[`
    .no-content-icon ion-icon{
      font-size: 80px !important;
    }
    .round-button{
      margin : 0 auto;
    }
  `]
})
export class NoContent{

  @Input() warningIcon : string;
  @Input() msg;
  @Input() btn : boolean;

  @Output()event : EventEmitter<any>= new EventEmitter<any>();
  msgKey : string = 'error.noContent';

  constructor() {}
  refreshEvent() {
    this.event.emit(true);
  }
}
