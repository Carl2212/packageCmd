import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { AvatarModule } from '../../components/avatar/avatar.module';
import { MenuModule } from '../../directives/menu/menu.module';
import { DeviceService } from '../../providers/device.service';

import { LeftNavbar } from './left-navbar';

@NgModule({
  declarations: [
    LeftNavbar
  ],
  providers: [
    DeviceService
  ],
  imports: [
    IonicModule,
    MenuModule,
    AvatarModule
  ],
  exports: [
    LeftNavbar
  ]
})
export class LeftNavbarModule {
  constructor() {
    
  }  
}