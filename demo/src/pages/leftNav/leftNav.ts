import { Component, ViewChild } from '@angular/core';

import { Content } from "ionic-angular";
import { NavStack, Setting } from "mobility-lib";

@Component({
  templateUrl: 'leftNav.html'
})
export class LeftNav {
  title: string;
  settingPage: any = Setting;

  constructor(
    public navStack: NavStack
  ) {
  }
  gotoSetting() {
    this.navStack.leftNav.push(Setting);
  }
}

