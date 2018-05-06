import { Provider, ClassProvider, ModuleWithProviders } from '@angular/core';
export * from './core.store';
export { NavStack } from './providers/nav.service';
export { DesService } from './providers/des.service';
export { LangService } from './providers/translate.service';
export { ToastService } from './providers/toast.service';
export { LoadingService } from './providers/loading.service';
export { DeviceService } from './providers/device.service';
export { WarningModule } from './components/warning/warning.module';
export { AvatarModule } from './components/avatar/avatar.module';
export { MenuModule } from './directives/menu/menu.module';
export { ValidatorModule } from "./directives/validator/validator.module";
export { NoContentModule } from "./components/no-content/no-content.module";
export * from "./providers/profile/profile.module";
export interface CoreModuleConfig {
    store?: ClassProvider;
    interceptor?: Provider;
    navStack?: Provider;
}
export declare class CoreModule {
    constructor(parentModule: CoreModule);
    static forRoot(config?: CoreModuleConfig): ModuleWithProviders;
}
