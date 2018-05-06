import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreStore } from '../core.store';
var LangService = (function () {
    function LangService(tlService, store) {
        this.tlService = tlService;
        this.store = store;
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
    LangService.prototype.getDefaultLanguageOptions = function () {
        //default
        var languageOptions = {
            language: 'en',
            culture: 'en-gb'
        };
        var browserCulture = navigator.language || 'en-gb';
        for (var _i = 0, _a = this.globalLanguages; _i < _a.length; _i++) {
            var item = _a[_i];
            if (browserCulture.toLowerCase() == item.culture) {
                languageOptions.language = item.language,
                    languageOptions.culture = browserCulture;
            }
        }
        return languageOptions;
    };
    LangService.prototype.setDefaultLang = function () {
        var lang = this.getDefaultLanguageOptions().language;
        this.setTranslation(lang);
        this.store.language = lang;
    };
    LangService.prototype.setLang = function () {
        console.log(this.store.language);
        if (this.store.language) {
            var lang = this.store.language;
            this.setTranslation(lang);
        }
        else {
            this.setDefaultLang();
        }
    };
    LangService.prototype.setTranslation = function (lang) {
        this.tlService.setDefaultLang(lang);
        this.tlService.use(lang);
    };
    return LangService;
}());
export { LangService };
LangService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
LangService.ctorParameters = function () { return [
    { type: TranslateService, },
    { type: CoreStore, },
]; };
//# sourceMappingURL=translate.service.js.map