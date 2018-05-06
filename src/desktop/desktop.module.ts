import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { Desktop } from './desktop';

export { Desktop } from './desktop';

@NgModule({
  declarations: [
    Desktop
  ],
  entryComponents: [
    Desktop
  ],
  imports: [
    CoreModule
  ]
})
export class DesktopModule {
  
}