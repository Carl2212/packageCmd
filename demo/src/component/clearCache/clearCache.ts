import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'clearCache',
  templateUrl: 'clearCache.html'
})
export class ClearCache {
  cacheSize: string | number = 0;

  constructor(public tlService: TranslateService) {
    this.initCacheSize();
  }

  initCacheSize() {
    this.cacheSize = 100;
  }

  clearCache() {
    // this.tsService.success(this.translation.clearCacheSuccess);
    this.cacheSize = 0;
  }

}
