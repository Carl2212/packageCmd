import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@Component({
  selector: 'scanner',
  template: `
    <ion-header>
      <ion-navbar hideBackButton="true">
        <ion-buttons start>
          <button ion-button clear icon-only color="dark" navPop>
            <ion-icon name="arrow-back-thin"></ion-icon>
          </button>
        </ion-buttons>
        <ion-title>{{'auth.scan' | translate}}</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content no-scroll [ngClass]="scanBody">
      <div [hidden]="scanBody=='has-bg'" class="scanner-wrapper">
        <div class="scanner">
          <div class="scan-area" text-center></div> 
          <div class="through-line"></div>
          <div class="scan-name">{{'auth.code' | translate}}</div>
        </div>
        <div class="button-bottom">
          <ion-icon [name]="light?'flashlight_on':'flashlight_off'" (click)="toggleLight()" color="light" tappable class="scan-icon"></ion-icon>
          <div *ngIf="light" padding-top>{{'auth.lightOn' | translate}}</div>
          <div *ngIf="!light" padding-top>{{'auth.lightOff' | translate}}</div>
        </div>
      </div> 
    </ion-content>
  `,
})
export class Scanner {
  light: boolean = false;
  private scanBody: string = "has-bg";

  constructor(
    private qrScanner: QRScanner,
    private viewCtrl: ViewController) {

  }

  ionViewDidLoad() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((data: string) => {     
            this.qrScanner.hide();
            this.viewCtrl.dismiss(data);
            scanSub.unsubscribe();
          });

          // show camera preview
          this.qrScanner.show();

          // wait for user to scan something, then the observable callback will be called
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  toggleLight() {
    if(this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {    
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  ionViewDidEnter() {
    this.showCamera();
    this.scanBody = "no-bg";
  }

  ionViewWillLeave() {
    this.hideCamera();
    this.scanBody = "has-bg";
    if(this.light) {
      this.toggleLight();
    }
  }
}