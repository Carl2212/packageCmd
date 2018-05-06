import { Component, ViewChild } from '@angular/core';
import { NavParams, Config } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { NavStack } from '../core/providers/nav.service';
var Desktop = (function () {
    function Desktop(navStack, navParams, keyboard, config) {
        this.navStack = navStack;
        this.navParams = navParams;
        this.keyboard = keyboard;
        this.config = config;
        this.leftPage = this.navParams.get('left');
        this.contentPage = this.navParams.get('content');
        this.rightPage = this.navParams.get('right');
    }
    Desktop.prototype.ngAfterViewInit = function () {
        this.navStack.leftNav = this.left;
        this.navStack.contNav = this.content;
        this.navStack.rightNav = this.right;
        this.keyboard.disableScroll(true);
        this.config.set('ios', 'scrollAssist', 'false');
        this.config.set('ios', 'autoFocusAssist', 'false');
    };
    return Desktop;
}());
export { Desktop };
Desktop.decorators = [
    { type: Component, args: [{
                template: "\n    <nav id=\"left\" class=\"main-left\">\n      <ion-nav [root]=\"leftPage\" #left swipeBackEnabled=\"false\"></ion-nav>\n    </nav>\n    <div id=\"content\" class=\"main-content\">\n      <ion-nav [root]=\"contentPage\" #content swipeBackEnabled=\"false\"></ion-nav>\n    </div>\n    <nav id=\"right\" class=\"main-right\">\n      <ion-nav [root]=\"rightPage\" #right swipeBackEnabled=\"false\"></ion-nav>\n    </nav>\n  "
            },] },
];
/** @nocollapse */
Desktop.ctorParameters = function () { return [
    { type: NavStack, },
    { type: NavParams, },
    { type: Keyboard, },
    { type: Config, },
]; };
Desktop.propDecorators = {
    'left': [{ type: ViewChild, args: ['left',] },],
    'content': [{ type: ViewChild, args: ['content',] },],
    'right': [{ type: ViewChild, args: ['right',] },],
};
//# sourceMappingURL=desktop.js.map