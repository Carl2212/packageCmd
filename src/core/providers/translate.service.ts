import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreStore } from '../core.store';

@Injectable()
export class LangService {
  private globalLanguages : Array<any>;
  
  constructor(
    private tlService: TranslateService,
    private store: CoreStore) {
  	this.globalLanguages = [
	    {
	      language: 'de',
	      languageName: 'German',
	      languageName$tr$: 'platform.loginLanguageGerman',
	      culture: 'de-de'
	    },
	    {
	      language: 'en',
	      languageName: 'English',
	      languageName$tr$: 'platform.loginLanguageEnglish',
	      culture: 'en-gb'
	    },
	    {
	      language: 'zh',
	      languageName: 'Chinese',
	      languageName$tr$: 'platform.loginLanguageChinese',
	      culture: 'zh-cn'
	    }
	  ];
  }

  getDefaultLanguageOptions() {
    //default
    let languageOptions = {
      language : 'en',
      culture : 'en-gb'
    };
    let browserCulture = navigator.language || 'en-gb';
    for (let item of this.globalLanguages) {
      if(browserCulture.toLowerCase() == item.culture) {
        languageOptions.language = item.language,
        languageOptions.culture = browserCulture;
      }
    } 
    return languageOptions;
  }

  setDefaultLang(): void {
    let lang = this.getDefaultLanguageOptions().language;
    this.setTranslation(lang);
    this.store.language = lang;
  }

  setLang(): void {
    console.log(this.store.language);
    if(this.store.language) {
      let lang: string = this.store.language;
      this.setTranslation(lang);
    } else {
      this.setDefaultLang();
    }
  }

  private setTranslation(lang: string) {
    this.tlService.setDefaultLang(lang);
    this.tlService.use(lang);
  }
}
