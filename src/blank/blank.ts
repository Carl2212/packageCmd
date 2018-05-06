import { Component, Inject, InjectionToken } from '@angular/core';
import { CoreStore } from '../core/core.store';

export const BLANK_CONFIG = new InjectionToken<any>('BLANK_CONFIG');

export interface BlankConfig {
  appName?: string;
  company?: string;
  desktop?: any; 
}

@Component({
  selector: 'blank',
  templateUrl: 'blank.html',
})
export class Blank{

  constructor(
    @Inject(BLANK_CONFIG) public blankConfig: Array<BlankConfig>,
    private store: CoreStore
  ) {
  }
}
