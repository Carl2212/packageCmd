import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuModule } from '../../directives/menu/menu.module';
import { MidNavbar } from './mid-navbar';

@NgModule({
  declarations: [
    MidNavbar
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    MenuModule
  ],
  exports: [
    MidNavbar
  ]
})
export class MidNavbarModule {
  constructor() {
    
  }  
}