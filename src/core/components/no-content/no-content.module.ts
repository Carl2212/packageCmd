import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { NoContent } from "./no-content";

@NgModule({
  declarations: [
    NoContent
  ],
  imports: [
    IonicModule,
    TranslateModule.forChild(),
  ],
  exports: [
    NoContent
  ]
})
export class NoContentModule {
  constructor() {
    
  }  
}