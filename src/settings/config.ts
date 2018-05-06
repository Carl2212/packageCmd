import { Inject, Injectable, InjectionToken } from "@angular/core";
import { CoreStore } from "../core/core.store";
export const SETTINGS_CONFIG = new InjectionToken<any>('SETTINGS_CONFIG');

export interface settingsConfig {
  about: aboutInfo,
  language?: Array<languagesStruct>,
  dynamicComponent?: any,
  privacyUrl? : string
}
export interface aboutInfo {
  appName?: string;
  appLogo?: string;
  logoUrl? : string;
  company?: string;
  version?: string;
  copyright?: string;
  website?: string;
}

export interface languagesStruct {
  lang: string,
  culture: string
}
@Injectable()
export class SettingsService {
  public aboutInfo: aboutInfo = {
    company: "RIB Software SE",
    version: "1.0.0",
    copyright: "©️2017 RIB Software SE",
    website: "mobility@ribitwo.com"
  };
  public langList: Array<languagesStruct> = [
    {lang: 'en', culture: 'en-gb'},
    {lang: 'zh', culture: 'zh-cn'},
    {lang: 'de', culture: 'de-de'}
  ];
  public dynamicComponent: any = false;

  private _isFirstLaunch : boolean = null;

  public privacyUrl : string;

  constructor(
    @Inject(SETTINGS_CONFIG) public configs: settingsConfig,
    private store : CoreStore
  ) {
    this.init();
  }

  init() {
    if (this.configs) {
      this.configs.about && (this.aboutInfo = Object.assign(this.aboutInfo, this.configs.about));
      this.configs.language && (this.langList = this.configs.language);
      this.configs.dynamicComponent && (this.dynamicComponent = this.configs.dynamicComponent);
      this.configs.privacyUrl && (this.privacyUrl = this.configs.privacyUrl);
    }
  }
  get isFirstLaunch() {
    if(this._isFirstLaunch != null) {
      return this._isFirstLaunch;
    }
    if(this.store.lastAppVersion != this.aboutInfo.version) {
      this.store.lastAppVersion = this.aboutInfo.version;
      this.isFirstLaunch = true;
    }else{
      this.isFirstLaunch = false;
    }
    return this._isFirstLaunch;
  }
  set isFirstLaunch(val :boolean) {
    this._isFirstLaunch = val;
  }
}