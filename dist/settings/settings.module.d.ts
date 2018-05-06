import { ModuleWithProviders } from '@angular/core';
import { settingsConfig } from "./config";
export { About } from "./about/about";
export { SettingCompany } from "./company/setting-company";
export { Language } from "./language/language";
export { SettingNavbar } from "./navbar/navbar";
export { Setting } from "./setting/setting";
export * from "./config";
export declare class SettingsModule {
    static forRoot(config?: settingsConfig): ModuleWithProviders;
}
