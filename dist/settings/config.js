import { Inject, Injectable, InjectionToken } from "@angular/core";
import { CoreStore } from "../core/core.store";
export var SETTINGS_CONFIG = new InjectionToken('SETTINGS_CONFIG');
var SettingsService = (function () {
    function SettingsService(configs, store) {
        this.configs = configs;
        this.store = store;
        this.aboutInfo = {
            company: "RIB Software SE",
            version: "1.0.0",
            copyright: "©️2017 RIB Software SE",
            website: "mobility@ribitwo.com"
        };
        this.langList = [
            { lang: 'en', culture: 'en-gb' },
            { lang: 'zh', culture: 'zh-cn' },
            { lang: 'de', culture: 'de-de' }
        ];
        this.dynamicComponent = false;
        this._isFirstLaunch = null;
        this.init();
    }
    SettingsService.prototype.init = function () {
        if (this.configs) {
            this.configs.about && (this.aboutInfo = Object.assign(this.aboutInfo, this.configs.about));
            this.configs.language && (this.langList = this.configs.language);
            this.configs.dynamicComponent && (this.dynamicComponent = this.configs.dynamicComponent);
            this.configs.privacyUrl && (this.privacyUrl = this.configs.privacyUrl);
        }
    };
    Object.defineProperty(SettingsService.prototype, "isFirstLaunch", {
        get: function () {
            if (this._isFirstLaunch != null) {
                return this._isFirstLaunch;
            }
            if (this.store.lastAppVersion != this.aboutInfo.version) {
                this.store.lastAppVersion = this.aboutInfo.version;
                this.isFirstLaunch = true;
            }
            else {
                this.isFirstLaunch = false;
            }
            return this._isFirstLaunch;
        },
        set: function (val) {
            this._isFirstLaunch = val;
        },
        enumerable: true,
        configurable: true
    });
    return SettingsService;
}());
export { SettingsService };
SettingsService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
SettingsService.ctorParameters = function () { return [
    { type: undefined, decorators: [{ type: Inject, args: [SETTINGS_CONFIG,] },] },
    { type: CoreStore, },
]; };
//# sourceMappingURL=config.js.map