import { TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private resources: Array<{ prefix: string, suffix: string }>
  ) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  getTranslation(lang: string): any {
    return Observable.forkJoin(
      this.resources
        .map(config => {
          return this.http.get(`${config.prefix}${lang}${config.suffix}`)
        })
    ).map((response) => {
      return response.reduce((a, b) => {
        return Object.assign(a, b);
      })
    }).catch(error => {
      throw 'i18n JSON Files had some mistakes';
    });
  }
}