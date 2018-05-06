import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController, NavParams, Select } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/providers/toast.service';
import { LoadingService } from '../../core/providers/loading.service';
import { selectCompany, hasChild, getIcon } from './common';
import { ProfileService } from "../../core/providers/profile/profile.service";
import { PROFILETICKET } from "../../core/providers/profile/profile.store";
var Company = (function () {
    function Company(tlService, navCtrl, authService, http, tsService, loading, navParams, profileService) {
        this.tlService = tlService;
        this.navCtrl = navCtrl;
        this.authService = authService;
        this.http = http;
        this.tsService = tsService;
        this.loading = loading;
        this.navParams = navParams;
        this.profileService = profileService;
        this.roles = {};
        this.company = { id: 0 };
        this.init();
    }
    Company.prototype.selectCompany = function (c) {
        selectCompany(c);
    };
    Company.prototype.hasChild = function (c) {
        return hasChild(c);
    };
    Company.prototype.getIcon = function (c) {
        return getIcon(c);
    };
    Company.prototype.getRoles = function (c) {
        if (c.id && this.companies) {
            if (this.roles[c.id]) {
                this.clientId = c.id;
                return this.roles[c.id];
            }
            else if (c.pids) {
                var n = c.pids.length - 1;
                if (c.pids.indexOf(c.id)) {
                    n = c.pids.indexOf(c.id);
                }
                while (n--) {
                    if (this.roles[c.pids[n]]) {
                        this.clientId = c.pids[n];
                        return this.roles[c.pids[n]];
                    }
                }
            }
        }
    };
    Company.prototype.save = function () {
        var _this = this;
        this.loading.create().present();
        if (this.company.companyType == 3) {
            this.clientId = this.company.parentId;
        }
        var serviceProxy = this.profile ? this.profileService : this.authService;
        serviceProxy.checkCompany(this.company.code, this.company.id, this.clientId, this.roleId)
            .then(function (res) {
            serviceProxy.setCompanyRole(_this.company.code + " " + _this.company.name, "" + _this.roleSelect.text);
            _this.loading.dismiss();
        }, function (fail) {
            _this.tlService.get('http')
                .subscribe(function (res) {
                _this.tsService.error(res[fail.error]);
            });
            _this.loading.dismiss();
        });
    };
    Company.prototype.init = function () {
        var context = this.authService.checkContext();
        this.profile = this.navParams.get('profile');
        if (this.profile) {
            context = this.profileService.checkContext();
        }
        if (context) {
            this.company.id = context.clientId;
            this.roleId = context.roleId;
            this.getCompanies();
        }
        else {
            this.getCompanies();
        }
    };
    Company.prototype.getCompanies = function () {
        var _this = this;
        this.loading.create().present();
        var url = this.profile ? "companies" + PROFILETICKET : 'companies';
        this.http.get(url)
            .subscribe(function (res) {
            _this.companies = _this.sortByCode(res.companies);
            _this.formatRoles(res.roles, res.rolesLookup);
            _this.formatNodes(_this.companies);
            _this.companiesError = null;
            _this.loading.dismiss();
        }, function (fail) {
            _this.tlService.get('http')
                .subscribe(function (res) {
                _this.tsService.error(res[fail.error]);
                _this.companiesError = res[fail.error];
            });
            _this.loading.dismiss();
        });
    };
    Company.prototype.sortByCode = function (list) {
        var sortList = list.sort(function (x, y) {
            return x.code > y.code ? 1 : -1;
        });
        return sortList;
    };
    Company.prototype.formatRoles = function (roles, rolesLookup) {
        var _this = this;
        roles.forEach(function (r) {
            _this.roles[r.clientId] = [];
            r.roleIds.forEach(function (id) {
                rolesLookup.forEach(function (l) {
                    if (l.key === id)
                        _this.roles[r.clientId].push({
                            value: l.value,
                            id: id
                        });
                });
            });
        });
    };
    Company.prototype.formatNodes = function (companies) {
        var _this = this;
        companies.forEach(function (c) {
            var pids = [];
            if (c.children) {
                pids.push(c.id);
                _this.formatChildNodes(c.children, pids);
            }
            if (c.id === _this.company.id) {
                _this.company = c;
            }
        });
    };
    Company.prototype.formatChildNodes = function (children, pids) {
        var _this = this;
        children.forEach(function (c) {
            c.pids = [].concat(pids);
            c.pids.push(c.id);
            if (c.children) {
                _this.formatChildNodes(c.children, c.pids);
            }
            if (c.id === _this.company.id) {
                _this.company = c;
                _this.selectNode(c.pids, _this.companies);
            }
        });
    };
    Company.prototype.selectNode = function (ids, list) {
        var _this = this;
        list.forEach(function (p) {
            if (p.id === ids[0]) {
                _this.selectCompany(p);
                var newIds = ids.slice(1);
                if (newIds.length > 0) {
                    _this.selectNode(newIds, p.children);
                }
            }
        });
    };
    Company.prototype.ngOnInit = function () {
        // setting-server
        if (this.navCtrl.parent.parent) {
            this.state = 1;
            // auth-server
        }
        else {
            this.state = 0;
        }
    };
    return Company;
}());
export { Company };
Company.decorators = [
    { type: Component, args: [{
                selector: 'company',
                template: "\n    <ion-content  class=\"disable-env-top\">\n      <warning *ngIf=\"companiesError\" [msg]=\"companiesError\" (event)=\"getCompanies()\"></warning>\n      <ion-list radio-group [(ngModel)]=\"company\" [attr.padding-top]=\"state?null:''\" >\n        <ion-item-group *ngFor=\"let c of companies\">\n          <ion-item (click)=\"selectCompany(c)\" tappable [class.disable-env-left]=\"!authService.checkContext()\" class=\"disable-env-right\">\n            <ion-icon name=\"{{getIcon(c)}}\" item-left></ion-icon>\n            <ion-label>{{c.code}} {{c.name}}</ion-label>\n            <ion-radio [value]=\"c\" (ionSelect)=\"selectCompany(c)\" *ngIf=\"c.companyType!=2\"></ion-radio>\n            <ion-icon *ngIf=\"hasChild(c)\" name=\"arrow-{{c.isOpen?'down-thin':'forward-thin'}}\" item-right></ion-icon>\n          </ion-item>\n          <tree-node [list]=\"c.children\" *ngIf=\"hasChild(c)\" [hidden]=\"!c.isOpen\"></tree-node>\n        </ion-item-group>\n      </ion-list>\n    </ion-content>\n\n    <ion-footer class=\"bt\">\n      <ion-row padding-horizontal align-items-center>\n        <ion-label col>{{'auth.role' | translate}}</ion-label>\n        <ion-select  #roleSelect col [(ngModel)]=\"roleId\" interface=\"popover\" text-right [disabled]=\"!getRoles(company)\" \n                    [placeholder]=\"tlService.instant('reminder.select', {key: tlService.instant('auth.role')})\">\n          <ion-option value=\"{{r.id}}\" *ngFor=\"let r of getRoles(company)\">{{r.value}}</ion-option>\n        </ion-select>\n      </ion-row>\n      <ion-row no-padding>\n        <ion-col no-padding>\n          <button ion-button full no-margin color=\"gray\"navPop>{{'common.cancel' | translate}}</button>\n        </ion-col>\n        <ion-col no-padding>\n          <button ion-button full no-margin color=\"primary\" (click)=\"save()\" [disabled]=\"!company||!roleId\">{{'common.ok' | translate}}</button>\n        </ion-col>\n      </ion-row>\n    </ion-footer>\n  "
            },] },
];
/** @nocollapse */
Company.ctorParameters = function () { return [
    { type: TranslateService, },
    { type: NavController, },
    { type: AuthService, },
    { type: HttpClient, },
    { type: ToastService, },
    { type: LoadingService, },
    { type: NavParams, },
    { type: ProfileService, },
]; };
Company.propDecorators = {
    'roleSelect': [{ type: ViewChild, args: [Select,] },],
};
//# sourceMappingURL=company.js.map