import { Component, ViewChild } from '@angular/core';
import { AlertController, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfileService } from "../../../core/providers/profile/profile.service";
import { CoreStore } from "../../../core/core.store";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../../core/providers/toast.service";
import { ProfileStore, profileStruct, PROFILETICKET } from "../../../core/providers/profile/profile.store";
import { LoadingService } from "../../../core/providers/loading.service";
import { Company } from "../../../auth/auth.module";

@Component({
  selector: 'profile-edit',
  templateUrl: 'profileEdit.html',
})
export class ProfileEdit {

  private editStatus : number; //1 is Add 2 is View 3 is Edit
  private oldProfile : profileStruct;

  private existCompanyRole : boolean;

  //排他
  private profileNameGroup : Array<string> = [];
  @ViewChild('name') name : any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private store : CoreStore,
    public pfStore : ProfileStore,
    private pfService : ProfileService,
    private tlService : TranslateService,
    private tsService : ToastService,
    private alertCtrl : AlertController,
    private viewCtrl : ViewController,
    private loading : LoadingService
  ) {
    this.init();
  }
  init() {
    this.editStatus = this.navParams.get('editStatus');
    this.oldProfile = this.navParams.get('profile');
    this.pfService.createProfile(this.oldProfile);
    this.existCompanyRole = !!this.store.clientContext.companyCode;
    this.getProfileNameGroup();
  }
  getProfileNameGroup() {
    if(this.pfService.profilegroup){
      this.profileNameGroup = this.pfService.getUniqueCompareProfilegroup()
        .map(l=>l.name);
    }

  }
  ionViewWillLeave() {
    this.pfService.checkCompanySuccess
      .takeUntil(this.viewCtrl.didEnter)
      .takeUntil(this.viewCtrl.willUnload)
      .subscribe(data=>{
          this.navCtrl.pop();
        }
      );
  }

  selectCompany() {
    this.loading.create().present();
    return this.pfService.checklogin(this.pfStore.server , this.pfStore.loginName , this.pfStore.password)
      .then((res : any)=>{
        if(this.existCompanyRole){
          this.navCtrl.push(Company,{'profile' : PROFILETICKET});
        }
        this.loading.dismiss();
      },
        fail=> {
          this.tlService.get(['error','http'])
            .subscribe(
              (res : any) =>{
                let msg = '';
                if (fail.error && fail.error == 400) {
                  msg = res.error.loginInfoError;
                } else {
                  msg = res.http[fail.error]
                };
                this.tsService.error(msg)
              }
            )
          this.loading.dismiss();
        });
  }
  save() {
    this.loading.create().present();
    this.pfService.saveProfile().then(()=>{
        this.loading.dismiss();
        this.navCtrl.pop();
      },
      fail=>{
        this.tlService.get(['profile','error','http'])
          .subscribe(
            (res : any) =>{
              let msg = '';
              if(fail == 1) {
                msg = res.profile.nonUniqueness;
              }else if (fail.error && fail.error == 400) {
                msg = res.error.loginInfoError;
              }else if (fail.error){
                msg = res.http[fail.error]
              }else {
                console.log(fail);
              };
              this.tsService.error(msg);
              this.loading.dismiss();
            }
          )
      }
    )
  }

  pop() {
    if(this.editStatus == 1) {
      this.navCtrl.pop();
    }else{
      for (let k in this.oldProfile) {
        this.pfStore[k] = this.oldProfile[k];
      }
      this.editStatus = 2;
    }
  }
  del() {
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
                  this.pfService.delProfile(this.oldProfile)
                    .then(
                    success=>this.navCtrl.pop()
                    )
                }
              }
            ]
          })
          p.present();

        }
      );
  }

}
