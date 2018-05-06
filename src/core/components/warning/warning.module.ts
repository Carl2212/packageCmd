import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { WarningComponent } from './warning.component';

@NgModule({
  declarations: [
    WarningComponent
  ],
  imports: [
  	IonicModule,
  	TranslateModule.forChild()
  ],
  exports: [
    WarningComponent
  ]
})
export class WarningModule {

}