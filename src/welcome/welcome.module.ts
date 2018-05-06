import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Welcome, WelcomeController } from './welcome';
import { CoreModule } from "../core/core.module";
import { WELCOMECONFIG } from "./config";

export * from './welcome';
export * from "./config";

@NgModule({
  declarations: [
    Welcome,
  ],
  imports: [
    IonicModule,
    CoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Welcome
  ]
})
export class WelcomeModule {
  static forRoot(config: any = null): ModuleWithProviders {
    return {
      ngModule: WelcomeModule,
      providers: [
        {provide: WELCOMECONFIG, useValue: config},
        WelcomeController
      ]
    }
  }
}
