import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
export declare class MultiTranslateHttpLoader implements TranslateLoader {
    private http;
    private resources;
    constructor(http: HttpClient, resources: Array<{
        prefix: string;
        suffix: string;
    }>);
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    getTranslation(lang: string): any;
}
