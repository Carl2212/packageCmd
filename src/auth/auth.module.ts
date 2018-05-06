import { NgModule, ModuleWithProviders } from '@angular/core';

import { Auth, AUTH_CONFIG, AuthConfig } from './auth';
import { Login } from './login/login';
import { Server } from './server/server';
import { Scanner } from './scanner/scanner';
import { Company } from './company/company';
import { TreeNode } from './company/treenode';
import { Help } from './help/help';

import { CoreModule } from '../core/core.module';
import { AuthService } from './auth.service';
import { Profile } from "./profile/profile";

export { AuthService } from './auth.service';
export { Auth, AuthConfig } from './auth';
export { Company } from './company/company';

@NgModule({
  declarations: [
    Auth,
    Server,
    Scanner,
    Login,
    Company,
    TreeNode,
    Help,
    Profile
  ],
  entryComponents: [
    Auth,
    Server,
    Scanner,
    Login,
    Company,
    TreeNode,
    Help,
    Profile
  ],
  providers: [
    AuthService
  ],
  imports: [
    CoreModule
  ]
})
export class AuthModule {
  /**
   * Use this method in your root module to provide the AuthService
   * @param {AuthModuleConfig} config
   * @returns {ModuleWithProviders}
   */
  static forRoot(config: AuthConfig = {}): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {provide: AUTH_CONFIG, useValue: config},
        AuthService
      ]
    };
  } 
}