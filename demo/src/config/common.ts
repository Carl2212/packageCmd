import { AppInit } from "../app/app.service";
import { HttpClient } from "@angular/common/http";

import { MultiTranslateHttpLoader } from "mobility-lib";

//translate.constant
export function TRANSLATIONS(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
      {prefix: 'assets/i18n/', suffix: '.json'},
      {prefix: 'lib/assets/i18n/', suffix: '.json'}
    ]
  );
}
export function appInitFactory(appInit: AppInit) {
  return () => appInit.load();
}