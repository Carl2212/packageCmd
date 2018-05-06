import { Directive, Input, HostListener, Renderer } from '@angular/core';
var MenuDirective = (function () {
    function MenuDirective(renderer) {
        this.renderer = renderer;
    }
    MenuDirective.prototype.onClick = function () {
        this.checkElement();
        if (this.side == 'left') {
            this.toggleLeftMenu();
        }
        else if (this.side == 'right' && this.right) {
            this.toggleRightMenu(this.act);
        }
    };
    MenuDirective.prototype.checkElement = function () {
        this.left = document.getElementById('left');
        this.content = document.getElementById('content');
        this.right = document.getElementById('right');
    };
    MenuDirective.prototype.toggleLeftMenu = function () {
        if (this.content.className.indexOf('open-left-cont') === -1) {
            this.renderer.setElementClass(this.left, 'open-left', true);
            this.renderer.setElementClass(this.content, 'open-left-cont', true);
        }
        else {
            this.renderer.setElementClass(this.left, 'open-left', false);
            this.renderer.setElementClass(this.content, 'open-left-cont', false);
        }
        if (this.right) {
            this.toggleRightMenu('close');
        }
    };
    MenuDirective.prototype.toggleRightMenu = function (act) {
        if (act == 'open') {
            this.renderer.setElementClass(this.right, 'open-right', true);
            this.renderer.setElementClass(this.content, 'open-left-cont', false);
            this.renderer.setElementClass(this.content, 'open-right-cont', true);
        }
        else if (act == 'close') {
            this.renderer.setElementClass(this.right, 'open-right', false);
            this.renderer.setElementClass(this.content, 'open-right-cont', false);
        }
    };
    return MenuDirective;
}());
export { MenuDirective };
MenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[menuBtn]'
            },] },
];
/** @nocollapse */
MenuDirective.ctorParameters = function () { return [
    { type: Renderer, },
]; };
MenuDirective.propDecorators = {
    'side': [{ type: Input, args: ['menuBtn',] },],
    'act': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click',] }, { type: HostListener, args: ['toggle',] },],
};
//# sourceMappingURL=menu.directive.js.map