import { Component, ViewChild } from '@angular/core';

import { Content } from "ionic-angular";
import { NavStack } from "mobility-lib";
import {HomePage} from "../home/home";

@Component({
  templateUrl: 'leftNav.html'
})
export class LeftNav {
  title: string;
  rootPage : any = HomePage;

  constructor(
    public navStack: NavStack
  ) {
  }
  gotoSetting() {

  }
}

