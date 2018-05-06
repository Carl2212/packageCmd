import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class DeviceService { 
  constructor(
    private platform: Platform) {

  }

  isCordova() {
    if (this.platform.is('cordova')) {
      return true;
    } else {
      return false;
    }
  }

  isMobile() {
    if (this.platform.is('iphone') || (this.platform.is('mobile') && !this.platform.is('tablet'))) {
      if (this.platform.isLandscape() && this.platform.width() < 813 || this.platform.isPortrait() && this.platform.height() < 813) {
        return true;
      } else {
        return false;
      }
    } else if (this.platform.is('phablet') || (this.platform.is('mobile') && this.platform.is('tablet'))) {
      if (this.platform.isPortrait() && this.platform.width() < 767) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
