import { ModuleWithProviders } from '@angular/core';
import { AuthConfig } from './auth';
export { AuthService } from './auth.service';
export { Auth, AuthConfig } from './auth';
export { Company } from './company/company';
export declare class AuthModule {
    /**
     * Use this method in your root module to provide the AuthService
     * @param {AuthModuleConfig} config
     * @returns {ModuleWithProviders}
     */
    static forRoot(config?: AuthConfig): ModuleWithProviders;
}
