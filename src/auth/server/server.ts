import { Component } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { NavStack } from '../../core/providers/nav.service';
import { AuthService } from '../auth.service';
import { Login } from '../login/login';
import { Scanner } from '../scanner/scanner';

@Component({
  template: `
    <div class="nav">
      <h2 text-center>{{'auth.server' | translate}}</h2>
      <ion-item [class.error]="!serverCtrl.valid&&serverCtrl.touched" class="disable-env-all">
        <ion-label stacked>
          {{'auth.server' | translate}} {{'auth.url' | translate}}
          <span class="err-msg" [hidden]="!(serverCtrl.hasError('required')&&serverCtrl.touched)">{{ 'reminder.blank' | translate: { key: ''} }}</span>
        </ion-label>
        <ion-input type="text" [formControl]="serverCtrl"></ion-input>
      </ion-item>
      <div margin-top padding-top text-center>
        <div padding-top>{{'auth.scan' | translate}}</div>
        <ion-icon name="scan" margin-top tappable (click)="scan()" class="scan-icon" color="primary"></ion-icon>
      </div>
    </div>

    <ion-footer>
      <button ion-button full no-margin color="primary" (click)="apply()" [disabled]="!serverCtrl.valid">{{'auth.apply' | translate}}</button>
    </ion-footer>
  `
})

export class Server {
  public serverCtrl: FormControl;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private navStack: NavStack) {
      this.initForm();
  } 

  public scan() {
    let rootNav = this.navStack.rootNav;
    let viewLeave = rootNav.viewDidLeave.subscribe(data => {
      let views = rootNav.getViews();
      views[views.length - 1].onDidDismiss(data => {
        if(data)
          this.serverCtrl.setValue(data); 
      });
      viewLeave.unsubscribe();
    });
    rootNav.push(Scanner);
  } 

  public apply() {
    this.authService.setServer(this.serverCtrl.value);
    this.navCtrl.push(Login, null, {animate: false});
  }

  private initForm() {
    this.serverCtrl = new FormControl('', [Validators.required]);
  }

  ngOnInit() {
    let server = this.authService.getServer();
    if(server) {
      this.serverCtrl.setValue(server); 
    }
  }
}
