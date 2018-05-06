import { Component, Input } from '@angular/core';

import { selectCompany, hasChild, getIcon } from './common';

@Component({ 
  selector: 'tree-node',
  template: `
    <ion-item-group *ngFor="let c of companies" padding-left>
      <ion-item (click)="selectCompany(c)" tappable>
        <ion-icon name="{{getIcon(c)}}" item-left></ion-icon>
        <ion-label>{{c.code}} {{c.name}}</ion-label>
        <ion-radio [value]="c" (ionSelect)="selectCompany(c)" *ngIf="c.companyType!=2"></ion-radio>
        <ion-icon *ngIf="hasChild(c)" name="arrow-{{c.isOpen?'down-thin':'forward-thin'}}" item-right></ion-icon>
      </ion-item>
      <tree-node [list]="c.children" *ngIf="hasChild(c)" [hidden]="!c.isOpen"></tree-node>
    </ion-item-group>
  `
})

export class TreeNode {
  @Input('list') companies: Array<any>;
  
  constructor() {
    
  }

  selectCompany(c: any) {
    selectCompany(c);
  }

  hasChild(c: any) {
    return hasChild(c);
  }

  getIcon(c: any) {
    return getIcon(c);
  }
}
