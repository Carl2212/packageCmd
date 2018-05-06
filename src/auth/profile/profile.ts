import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingService } from "../../core/providers/loading.service";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../core/providers/toast.service";
import { profileStruct } from "../../core/providers/profile/profile.store";
import { AuthService } from "../auth.service";

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
})
export class Profile {

  profilegroup : Array<profileStruct>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loading : LoadingService,
    private pfService : ProfileService,
    private tlService : TranslateService,
    private tsService : ToastService,
    private authService : AuthService
  ) {
  }

  ionViewDidLoad() {
    this.profilegroup = this.pfService.profilegroup;

  }
  loginWithProfile(profile : profileStruct) {
    this.loading.create().present();
    this.authService.loginWithProfile(profile).then(
      success =>{
        this.pfService.login(profile);
        this.loading.dismiss();
      },
      fail => {
        if(fail.error && fail.error == 400) {
          this.tlService.get('error')
            .subscribe((res : any) =>{
              this.tsService.error(res[fail.loginInfoError]);
            })
        } else {
          this.tlService.get('http')
            .subscribe((res : any)=>{
              this.tsService.error(res[fail.error]);
            });
        }
      }
    );

  }
}
