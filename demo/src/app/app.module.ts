import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage";
import { HttpClient } from "@angular/common/http";
import { Keyboard } from "@ionic-native/keyboard";
import { QRScanner } from "@ionic-native/qr-scanner";

import { appInitFactory, TRANSLATIONS } from "../config/common";
import { AppStore } from "../config/app.store";
import { App } from "./app.component";
import { AppInit } from "./app.service";
import { ClearCache } from "../component/clearCache/clearCache";
import { LeftNav } from "../pages/leftNav/leftNav";
import { HomePage } from '../pages/home/home';


import { CoreModule, CoreStore, LeftNavbarModule } from "mobility-lib";

@NgModule({
  declarations: [
    App,
    HomePage,
    ClearCache,
    LeftNav
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(App,{
      mode: 'ios'}
      ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TRANSLATIONS,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__ProgressByActivity',
      driverOrder: ['localstorage', 'indexeddb', 'websql']
    }),

    CoreModule.forRoot({
      store: {
        provide: CoreStore,
        useClass: AppStore
      }
    }),
    LeftNavbarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    HomePage,
    ClearCache,
    LeftNav
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    QRScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppInit,
    {provide: APP_INITIALIZER, useFactory: appInitFactory, deps: [AppInit], multi: true}
  ]
})
export class AppModule {
  constructor(
  ) {
  }
}
