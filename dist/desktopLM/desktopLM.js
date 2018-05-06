import { Component, ViewChild } from '@angular/core';
import { NavParams, Config } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NavStack } from '../core/providers/nav.service';
var DesktopLM = (function () {
    function DesktopLM(navStack, navParams, keyboard, config) {
        this.navStack = navStack;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.config = config;
        this.leftPage = this.navParams.get('left');
        this.contentPage = this.navParams.get('content');
    }
    DesktopLM.prototype.ngAfterViewInit = function () {
        this.navStack.leftNav = this.left;
        this.navStack.contNav = this.content;
        this.keyboard.disableScroll(true);
        this.config.set('ios', 'scrollAssist', 'false');
        this.config.set('ios', 'autoFocusAssist', 'false');
    };
    return DesktopLM;
}());
export { DesktopLM };
DesktopLM.decorators = [
    { type: Component, args: [{
                selector: 'desktop-l-m',
                template: "\n  <ion-menu [content]=\"content\" persistent=\"true\">\n    <ion-nav [root]=\"leftPage\" #left swipeBackEnabled=\"false\"></ion-nav>\n  </ion-menu>\n  <ion-nav [root]=\"contentPage\" #content swipeBackEnabled=\"false\"></ion-nav>\n  "
            },] },
];
/** @nocollapse */
DesktopLM.ctorParameters = function () { return [
    { type: NavStack, },
    { type: NavParams, },
    { type: Keyboard, },
    { type: Config, },
]; };
DesktopLM.propDecorators = {
    'left': [{ type: ViewChild, args: ['left',] },],
    'content': [{ type: ViewChild, args: ['content',] },],
};
//# sourceMappingURL=desktopLM.js.map