import { Observable } from "rxjs";
var MultiTranslateHttpLoader = (function () {
    function MultiTranslateHttpLoader(http, resources) {
        this.http = http;
        this.resources = resources;
    }
    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    MultiTranslateHttpLoader.prototype.getTranslation = function (lang) {
        var _this = this;
        return Observable.forkJoin(this.resources
            .map(function (config) {
            return _this.http.get("" + config.prefix + lang + config.suffix);
        })).map(function (response) {
            return response.reduce(function (a, b) {
                return Object.assign(a, b);
            });
        }).catch(function (error) {
            throw 'i18n JSON Files had some mistakes';
        });
    };
    return MultiTranslateHttpLoader;
}());
export { MultiTranslateHttpLoader };
//# sourceMappingURL=multiTranslateHttpLoader.js.map