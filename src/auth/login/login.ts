import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/providers/toast.service';
import { LoadingService } from '../../core/providers/loading.service';
import { Company } from '../company/company';
import { CoreStore } from "../../core/core.store";
import { Profile } from "../profile/profile";
import { ProfileService } from "../../core/providers/profile/profile.service";

@Component({
  template: `
    <div class="nav" padding>
      <h2 text-center>{{'auth.login' | translate}}</h2>
      <ion-item class="disable-env-all">
        <ion-label>{{'setting.language' | translate}}</ion-label>
        <ion-select interface="popover" [ngModel]="language" (ngModelChange)="langChange($event)">
          <ion-option [value]="l.lang" *ngFor="let l of langList">{{l.name}}</ion-option>
        </ion-select>
      </ion-item>
      <form [formGroup]="loginForm">
        <ion-item [class.error]="!username.valid&&username.touched" class="disable-env-all">
          <ion-label [attr.stacked]="username.hasError('required')&&username.touched?'':null">
            {{'auth.userName' | translate}}
            <span class="err-msg" *ngIf="username.hasError('required')&&username.touched">{{ 'reminder.blank' | translate: { key: ''} }}</span>
          </ion-label>
          <ion-input type="text" [(ngModel)]="user.name" [formControl]="username" text-right></ion-input>
        </ion-item>
        <ion-item [class.error]="!password.valid&&password.touched" class="disable-env-all">
          <ion-label [attr.stacked]="password.hasError('required')&&password.touched?'':null">
            {{'auth.password' | translate}}
            <span class="err-msg" *ngIf="password.hasError('required')&&password.touched">{{'reminder.blank' | translate: { key: ''} }}</span>
          </ion-label>
          <ion-input type="password" [(ngModel)]="user.password" [formControl]="password" text-right></ion-input>
        </ion-item>
      </form>
      <button ion-button color="primary" small float-right margin-top (click)="popToServer()">{{'auth.serverSetting' | translate}}</button>
    </div>

    <ion-footer>
      <button ion-button full no-margin color="gray" (click)="loginWithProfile()" *ngIf="coreStore.enableProfile && profileService.profilegroup">
        <ion-label color="primary">{{'auth.loginWithProfile' | translate}}</ion-label>
      </button>
      <button ion-button full no-margin color="primary" (click)="login()" [disabled]="!loginForm.valid">{{'auth.login' | translate}}</button>
    </ion-footer>
  `
})

export class Login {
  langList: Array<any>;
  user: any = {
    name: '',
    password: ''
  };
  language: string;

  loginForm: FormGroup;
  username: any;
  password: any;

  constructor(
    public tlService: TranslateService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private tsService: ToastService,
    private loading: LoadingService,
    private coreStore : CoreStore,
    public profileService : ProfileService
  ) {
    this.initForm();
    this.initLoginInfo();
  }

  private initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
    this.username = this.loginForm.controls['username'];
    this.password = this.loginForm.controls['password'];
  }

  private initLoginInfo() {
    let info = this.authService.getLoginInfo();
    if(info) {
      this.user.name = info.name
    }
  }

  langChange(e: string) {
    this.language = e;
    this.tlService.use(this.language);
    let culture;
    this.langList.forEach((l,i) => {
      if(l.lang == this.language)
        culture = l.culture;
    });
    this.authService.changeLang(this.language, culture);
  }

  login() {
    this.loading.create().present();
    this.authService.login(this.user.name, this.user.password)
      .then(success => {
        this.navCtrl.push(Company, null, {animate: false});
        this.authService.setUser();
        this.authService.setLoginInfo(this.user);
        this.loading.dismiss(); 
      }, fail => {
        if(fail.error && fail.error == 400) {
          this.tlService.get('error')
            .subscribe((res: any) => {
              this.tsService.error(res.loginInfoError);
            });
        } else {
          this.tlService.get('http')
            .subscribe((res: any) => {
              this.tsService.error(res[fail.error]);
            });
        }
        this.loading.dismiss(); 
      });
  }
  loginWithProfile() {
    this.navCtrl.push(Profile, null, {animate: false});
  }

  popToServer() {
    this.navCtrl.pop({animate:false});
  }

  private setLangList(data: any) {
    let list = [
      { lang: 'en', culture: 'en-gb' },
      { lang: 'zh', culture: 'zh-hans' },
      { lang: 'de', culture: 'de-de' }
    ];
    let langList: any[] = [];
    list.forEach((l,i) => {
      langList.push({
        name: data.language[l.lang],
        lang: l.lang,
        culture: l.culture
      });
      if(l.lang == this.language)
        this.language = l.lang;
    });
    this.langList = langList;
  }

  ngOnInit() {
    this.language = this.tlService.currentLang;
    this.tlService.getTranslation(this.language)
      .subscribe(data => {
        this.setLangList(data);
      });
  }
}
