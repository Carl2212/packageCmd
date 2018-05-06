import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { DesktopLM } from './desktopLM';

export { DesktopLM } from './desktopLM';

@NgModule({
  declarations: [
    DesktopLM
  ],
  entryComponents: [
    DesktopLM
  ],
  imports: [
    CoreModule
  ]
})
export class DesktopLMModule {
  
}