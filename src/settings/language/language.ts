import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { SettingsService } from "../config";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'language',
  templateUrl: 'language.html'
})
export class Language {
  title: string;
  langList: Array<any>;
  language: string;

  constructor(
    public tlService: TranslateService,
    private stService: SettingsService,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.langList = this.stService.langList;
    let currentLang = this.tlService.currentLang;
    this.langList.forEach((l, i) => {
      if (l.lang == currentLang)
        this.language = l.lang;
    });
  }

  langChange(e) {
    this.language = e.lang;
    this.tlService.use(this.language);
    let culture;
    this.langList.forEach((l, i) => {
      if (l.lang == this.language)
        culture = l.culture;
    });
    this.authService.changeLang(this.language, culture);
  }
}
