import { Injectable } from '@angular/core';
import { NavController } from "ionic-angular";

@Injectable()
export class NavStack {
  public rootNav: any = NavController;
  public leftNav: any = NavController;
  public contNav: any = NavController;
  public rightNav: any = NavController;
}