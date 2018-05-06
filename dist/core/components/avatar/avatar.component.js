import { Component, Input } from '@angular/core';
var AvatarComponent = (function () {
    function AvatarComponent() {
    }
    AvatarComponent.prototype.nameAbrr = function () {
        var name = '';
        if (this.name) {
            var regx = /\b[A-Za-z]/g;
            var abrr = this.name.match(regx).join('');
            name = abrr.substring(0, 2).toUpperCase();
        }
        return name;
    };
    return AvatarComponent;
}());
export { AvatarComponent };
AvatarComponent.decorators = [
    { type: Component, args: [{
                selector: 'avatar',
                template: "<div class=\"avatar\">{{name?nameAbrr():''}}</div>"
            },] },
];
/** @nocollapse */
AvatarComponent.ctorParameters = function () { return []; };
AvatarComponent.propDecorators = {
    'name': [{ type: Input },],
};
//# sourceMappingURL=avatar.component.js.map