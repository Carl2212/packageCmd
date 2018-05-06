import { TranslateService } from '@ngx-translate/core';
import { CoreStore } from '../core.store';
export declare class LangService {
    private tlService;
    private store;
    private globalLanguages;
    constructor(tlService: TranslateService, store: CoreStore);
    getDefaultLanguageOptions(): {
        language: string;
        culture: string;
    };
    setDefaultLang(): void;
    setLang(): void;
    private setTranslation(lang);
}
