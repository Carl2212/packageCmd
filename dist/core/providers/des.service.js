import * as DES from "des.js/lib/des";
import * as Buffer from "buffer";
import { Injectable } from "@angular/core";
var DesService = (function () {
    function DesService() {
        this.key = "mobility";
    }
    DesService.prototype.encrypt = function (str) {
        var key = new Buffer.Buffer(this.key, 'utf8');
        var encryptObj = DES.DES.create({ type: 'encrypt', key: key });
        var input = new Buffer.Buffer(str);
        var result = new Buffer.Buffer(encryptObj.update(input).concat(encryptObj.final()));
        return result.toString('hex');
    };
    DesService.prototype.decrypt = function (str) {
        var key = new Buffer.Buffer(this.key, 'utf8');
        var decryptObj = DES.DES.create({ type: 'decrypt', key: key });
        var input = new Buffer.Buffer(str, 'hex');
        var result = new Buffer.Buffer(decryptObj.update(input).concat(decryptObj.final()));
        return result.toString();
    };
    return DesService;
}());
export { DesService };
DesService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DesService.ctorParameters = function () { return []; };
//# sourceMappingURL=des.service.js.map