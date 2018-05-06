import { NgModule, ModuleWithProviders } from '@angular/core';

import { MenuModule } from '../core/directives/menu/menu.module';
import { AvatarModule } from '../core/components/avatar/avatar.module';
import { MidNavbarModule } from '../core/components/mid-navbar/mid-navbar.module';
import { CoreModule } from '../core/core.module';

import { Blank, BlankConfig, BLANK_CONFIG } from './blank';
export { Blank, BlankConfig } from './blank';

@NgModule({
  declarations: [
    Blank
  ],
  entryComponents: [
    Blank
  ],
  imports: [
    MenuModule,
    AvatarModule,
    MidNavbarModule,
    CoreModule
  ]
})
export class BlankModule {
  static forRoot(config: BlankConfig = {}): ModuleWithProviders {
    return {
      ngModule: BlankModule,
      providers: [
        {provide: BLANK_CONFIG, useValue: config}
      ]
    };
  }
}