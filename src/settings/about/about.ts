import {Component} from "@angular/core";
import {aboutInfo, SettingsService} from "../config";

@Component({
  templateUrl:"about.html"
})

export class About{
  aboutInfo : aboutInfo;

  constructor(
    private stService : SettingsService
  ) {
    this.aboutInfo = this.stService.aboutInfo;
  }
}