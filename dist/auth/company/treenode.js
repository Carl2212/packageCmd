import { Component, Input } from '@angular/core';
import { selectCompany, hasChild, getIcon } from './common';
var TreeNode = (function () {
    function TreeNode() {
    }
    TreeNode.prototype.selectCompany = function (c) {
        selectCompany(c);
    };
    TreeNode.prototype.hasChild = function (c) {
        return hasChild(c);
    };
    TreeNode.prototype.getIcon = function (c) {
        return getIcon(c);
    };
    return TreeNode;
}());
export { TreeNode };
TreeNode.decorators = [
    { type: Component, args: [{
                selector: 'tree-node',
                template: "\n    <ion-item-group *ngFor=\"let c of companies\" padding-left>\n      <ion-item (click)=\"selectCompany(c)\" tappable>\n        <ion-icon name=\"{{getIcon(c)}}\" item-left></ion-icon>\n        <ion-label>{{c.code}} {{c.name}}</ion-label>\n        <ion-radio [value]=\"c\" (ionSelect)=\"selectCompany(c)\" *ngIf=\"c.companyType!=2\"></ion-radio>\n        <ion-icon *ngIf=\"hasChild(c)\" name=\"arrow-{{c.isOpen?'down-thin':'forward-thin'}}\" item-right></ion-icon>\n      </ion-item>\n      <tree-node [list]=\"c.children\" *ngIf=\"hasChild(c)\" [hidden]=\"!c.isOpen\"></tree-node>\n    </ion-item-group>\n  "
            },] },
];
/** @nocollapse */
TreeNode.ctorParameters = function () { return []; };
TreeNode.propDecorators = {
    'companies': [{ type: Input, args: ['list',] },],
};
//# sourceMappingURL=treenode.js.map