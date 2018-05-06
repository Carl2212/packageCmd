import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { ProfileEdit } from "./Edit/profileEdit";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { CoreStore } from "../../core/core.store";
import { AuthService } from "../../auth/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { profileStruct } from "../../core/providers/profile/profile.store";
import { LoadingService } from "../../core/providers/loading.service";

let FIRST_LOAD_PROFILE = true;

@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  styles: [`
    .popover-icon-only{
        position: relative;
    }
    .popover-icon-only ion-select{
      width : 100%;
      height : 100%;
      position: absolute;
      z-index : 99;
      left : 0;
    }
    .popover-icon-only .select-text{
      display: none;
    }
  `]
})
export class Profile {

  addType : string;
  profileEdit : Component = ProfileEdit;
  constructor(
    private navCtrl: NavController,
    private pfService : ProfileService,
    private store : CoreStore,
    private authSerivice : AuthService,
    private tlService : TranslateService,
    private alertCtrl : AlertController,
    private settingService : SettingsService,
    private loading : LoadingService
  ) {}

  static isFirstLoad() {
    let tmp = FIRST_LOAD_PROFILE;
    FIRST_LOAD_PROFILE = false;
    return tmp;
  }
  ionViewDidLoad() {
    if(this.settingService.isFirstLaunch && Profile.isFirstLoad()) {
      this.tlService.get('profile')
        .subscribe(
          (res : any)=>{
            this.alertCtrl.create({
              title : res.tipTitle,
              message : `${res.tipMessageP1} \n ${res.tipMessageP2}`,
              buttons : ['ok']
            }).present();
          }
        );
    }
  }

  addTypeChange(type) {
    let profile : profileStruct = null;
    if(type == 1) {
      let loginInfo = this.store.loginInfo;
      let companyRole = this.authSerivice.getCompanyRole();
      profile = {
        name : null,
        user : null,
        server : this.authSerivice.getServer(),
        loginInfo : loginInfo,
        companyRole : companyRole,
        clientContext : this.store.clientContext,
        authentication : this.store.authentication
      };
    }
    let params = {editStatus : 1, profile : profile};
    this.navCtrl.push(ProfileEdit , params);
    setTimeout(()=>{
      this.addType = null;
    },0);
  }
  del(profile : profileStruct) {
    this.tlService.get(['profile','common','http'])
      .subscribe(
        res =>{
          let p = this.alertCtrl.create({
            title : res.profile.delTip,
            buttons : [
              {
                text : res.common.cancel,
                role : 'cancel'
              },
              {
                text : res.common.ok,
                handler : ()=>{
                  this.pfService.delProfile(profile);
                }
              }
            ]
          })
          p.present();
        }
      );
  }
  toggleProfile(profile : profileStruct) {
    this.loading.create().present();
    this.authSerivice.loginWithProfile(profile)
      .then(()=>{
        this.pfService.login(profile);
        this.loading.dismiss()})
      .catch(()=>this.loading.dismiss());
  }
  enableProfile($event) {
    if($event) {
      this.pfService.init()
        .then(
          data=>{
            this.pfService.resetLogin();
          }
        ).catch(()=>{});
    }
  }
}
