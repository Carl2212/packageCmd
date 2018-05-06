import { ModuleWithProviders, NgModule } from '@angular/core';
import { CoreModule } from "../core/core.module";
import { About } from "./about/about";
import { SettingCompany } from "./company/setting-company";
import { Language } from "./language/language";
import { SettingNavbar } from "./navbar/navbar";
import { Setting } from "./setting/setting";
import { SETTINGS_CONFIG, settingsConfig, SettingsService } from "./config";
import { MidNavbarModule } from "../core/components/mid-navbar/mid-navbar.module";
import { Profile } from "./profile/profile";
import { ProfileEdit } from "./profile/Edit/profileEdit";
import { SettingProfile } from "./profile/setting-profile";

export { About } from "./about/about";
export { SettingCompany } from "./company/setting-company";
export { Language } from "./language/language";
export { SettingNavbar } from "./navbar/navbar";
export { Setting } from "./setting/setting";
export * from "./config";

@NgModule({
  declarations: [
    About,
    SettingCompany,
    Language,
    SettingNavbar,
    Setting,
    ProfileEdit,
    Profile,
    SettingProfile

  ],
  entryComponents: [
    About,
    SettingCompany,
    Language,
    SettingNavbar,
    Setting,
    ProfileEdit,
    Profile,
    SettingProfile
  ],
  imports: [
    CoreModule,
    MidNavbarModule
  ],
  providers: [
    SettingsService
  ]
})
export class SettingsModule {
  static forRoot(config: settingsConfig = null): ModuleWithProviders {
    return {
      ngModule: SettingsModule,
      providers: [
        {provide: SETTINGS_CONFIG, useValue: config}
      ]
    }
  }
}
