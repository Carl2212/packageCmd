import { Component, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { App } from 'ionic-angular';
import { Auth } from "../../auth/auth";
import { AuthService } from "../../auth/auth.service";
import { Language } from "../language/language";
import { About } from "../about/about";
import { SettingCompany } from "../company/setting-company";
import { CoreStore } from "../../core/core.store";
import { SettingsService } from "../config";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { SettingProfile } from "../profile/setting-profile";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'setting',
  templateUrl: 'setting.html'
})
export class Setting{
  about: Component = About;
  settingCompany: Component = SettingCompany;
  language: Component = Language;
  SettingProfile : Component = SettingProfile;

  user: any = {};
  showWelcome: boolean;

  @ViewChild('extensible', {read: ViewContainerRef}) ioncontent: ViewContainerRef;
  compRef: ComponentRef<any>;

  constructor(
    private appCtrl: App,
    private authService: AuthService,
    private store: CoreStore,
    private cfr: ComponentFactoryResolver,
    private stService: SettingsService,
    private pfService : ProfileService,
    public tlService : TranslateService
  ) {
  }

  public loadComponent(comp: any) {
    if (!this.compRef) {
      let factory = this.cfr.resolveComponentFactory(comp);
      this.compRef = this.ioncontent.createComponent(factory);
    }
  }

  initUser() {
    let user = this.store.user;
    if (user) {
      this.user = {
        name: user.UserName,
        mail: user.Email
      };
    }
  }
  getLanguage(currentLang) {
    let language = this.stService.langList.find(l=>l.lang == currentLang);
    return language ? `language.${language.lang}` : '';
  }
  ngOnInit() {
    this.initUser();
    if (this.stService.dynamicComponent) {
      this.loadComponent(this.stService.dynamicComponent);
    }
    if (!this.store.clientContext.companyCode) {
      this.settingCompany = null;
    }
    this.showWelcome = this.store.isShowWelcome;
  }

  logout() {
    this.appCtrl.getRootNav().setRoot(Auth);
    this.authService.logout();
    this.pfService.resetLogin();
  }

  setShowWelcome() {
    this.store.isShowWelcome = this.showWelcome;
  }
}
