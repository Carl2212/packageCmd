import { AppInit } from "../app/app.service";
import { HttpClient } from "@angular/common/http";

import { AuthConfig, aboutInfo, languagesStruct, settingsConfig, BlankConfig, welcomeItemStruct, MultiTranslateHttpLoader } from "mobility-lib";

import { ClearCache } from "../component/clearCache/clearCache";

export const AboutInfo: aboutInfo = {
  appName: "app.defectMgnt",
  logoUrl : 'assets/icon/defect.svg',
  appLogo: "app.itwo",
  version: "1.2.0",
};
export const AUTHCONFIG : AuthConfig = {
  logoUrl: 'assets/icon/logo.svg',
  twoUrl: 'assets/imgs/itwo.svg',
  appName: 'app.defectMgnt',
  company: 'app.itwo'
};
export const languages: Array<languagesStruct> = [
  {lang: 'en', culture: 'en-gb'},
  {lang: 'zh', culture: 'zh-hans'},
  {lang: 'de', culture: 'de-de'}
];

export const WELCOMECONFIG: Array<welcomeItemStruct> = [
  {
    topImg: 'assets/imgs/itwo.svg',
    appName: 'app.defectMgnt',
    title: 'welcome.screen1.title',
    description: 'welcome.screen1.description',
    isGetStartBtn: false,
    bottomImg: 'assets/imgs/logo.png'
  },
  {
    topImg: 'assets/imgs/title2.png',
    title: 'welcome.screen2.title',
    description: 'welcome.screen2.description',
    isGetStartBtn: false
  },
  {
    topImg: 'assets/imgs/title3.png',
    title: 'welcome.screen3.title',
    description: 'welcome.screen3.description',
    isGetStartBtn: false
  },
  {
    topImg: 'assets/imgs/title4.png',
    title: 'welcome.screen4.title',
    description: 'welcome.screen4.description',
    isGetStartBtn: true,
    startBtnText: 'welcome.started'
  },
];
export const SETTINGSCONFIG : settingsConfig = {
  about: AboutInfo,
  language: languages,
  dynamicComponent: ClearCache,
  privacyUrl : 'assets/privacy/privacy.html?json'
}
export const BLANKCONFIG: BlankConfig = {
  appName: "app.appName",
  company: "app.itwo"
}

//translate.constant
export function TRANSLATIONS(http: any) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: 'assets/i18n/', suffix: '.json'},
      {prefix: 'lib/assets/i18n/', suffix: '.json'}
    ]
  );
}
export function appInitFactory(appInit: AppInit) {
  return () => appInit.load();
}