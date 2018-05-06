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

@Component({
  selector: 'company',
  template: `
    <ion-content  class="disable-env-top">
      <warning *ngIf="companiesError" [msg]="companiesError" (event)="getCompanies()"></warning>
      <ion-list radio-group [(ngModel)]="company" [attr.padding-top]="state?null:''" >
        <ion-item-group *ngFor="let c of companies">
          <ion-item (click)="selectCompany(c)" tappable [class.disable-env-left]="!authService.checkContext()" class="disable-env-right">
            <ion-icon name="{{getIcon(c)}}" item-left></ion-icon>
            <ion-label>{{c.code}} {{c.name}}</ion-label>
            <ion-radio [value]="c" (ionSelect)="selectCompany(c)" *ngIf="c.companyType!=2"></ion-radio>
            <ion-icon *ngIf="hasChild(c)" name="arrow-{{c.isOpen?'down-thin':'forward-thin'}}" item-right></ion-icon>
          </ion-item>
          <tree-node [list]="c.children" *ngIf="hasChild(c)" [hidden]="!c.isOpen"></tree-node>
        </ion-item-group>
      </ion-list>
    </ion-content>

    <ion-footer class="bt">
      <ion-row padding-horizontal align-items-center>
        <ion-label col>{{'auth.role' | translate}}</ion-label>
        <ion-select  #roleSelect col [(ngModel)]="roleId" interface="popover" text-right [disabled]="!getRoles(company)" 
                    [placeholder]="tlService.instant('reminder.select', {key: tlService.instant('auth.role')})">
          <ion-option value="{{r.id}}" *ngFor="let r of getRoles(company)">{{r.value}}</ion-option>
        </ion-select>
      </ion-row>
      <ion-row no-padding>
        <ion-col no-padding>
          <button ion-button full no-margin color="gray"navPop>{{'common.cancel' | translate}}</button>
        </ion-col>
        <ion-col no-padding>
          <button ion-button full no-margin color="primary" (click)="save()" [disabled]="!company||!roleId">{{'common.ok' | translate}}</button>
        </ion-col>
      </ion-row>
    </ion-footer>
  `
})

export class Company {
  public state: number;
  public companies: Array<any>;
  public roles: any = {};
  public company: any = {id: 0};
  public roleId: number;
  
  public companiesError: string;
  
  private clientId: number;

  private profile : any;

  @ViewChild(Select) roleSelect : Select;
  constructor(
    private tlService: TranslateService,
    private navCtrl: NavController,
    private authService: AuthService,
    private http: HttpClient,
    private tsService: ToastService,
    private loading: LoadingService,
    private navParams : NavParams,
    private profileService : ProfileService
    ) {
      this.init();
  }

  public selectCompany(c: any) { 
    selectCompany(c);
  }

  public hasChild(c: any) { 
    return hasChild(c);
  }

  public getIcon(c: any) {
    return getIcon(c);
  }

  public getRoles(c: any) {
    if(c.id && this.companies) {
      if(this.roles[c.id]) {
        this.clientId = c.id;
        return this.roles[c.id];
      } else if(c.pids) {
        let n = c.pids.length - 1;
        if(c.pids.indexOf(c.id)) {
          n = c.pids.indexOf(c.id);
        }
        while(n--) {
          if(this.roles[c.pids[n]]) {
            this.clientId = c.pids[n];
            return this.roles[c.pids[n]];
          }
        }
      }
    }
  }

  public save() {
    this.loading.create().present();
    if(this.company.companyType == 3) {
      this.clientId = this.company.parentId
    }

    let serviceProxy = this.profile ? this.profileService : this.authService;

    serviceProxy.checkCompany(this.company.code, this.company.id, this.clientId, this.roleId)
      .then((res: any) => {
        serviceProxy.setCompanyRole(`${this.company.code} ${this.company.name}` , `${this.roleSelect.text}`);
        this.loading.dismiss();
      }, fail => {
        this.tlService.get('http')
          .subscribe((res: any) => {
            this.tsService.error(res[fail.error]);
          });
        this.loading.dismiss();
      });
  }

  private init() {
    let context = this.authService.checkContext();

    this.profile = this.navParams.get('profile');
    if(this.profile) {
      context = this.profileService.checkContext();
    }

    if(context) {
      this.company.id = context.clientId;            
      this.roleId = context.roleId;
      this.getCompanies();
    } else {
      this.getCompanies();
    }
  }

  private getCompanies() {
    this.loading.create().present();
    let url = this.profile ? `companies${PROFILETICKET}` : 'companies';
    this.http.get(url)
      .subscribe((res: any) => {
        this.companies = this.sortByCode(res.companies);
        this.formatRoles(res.roles, res.rolesLookup);
        this.formatNodes(this.companies);
        this.companiesError = null;
        this.loading.dismiss();
      }, fail => {
        this.tlService.get('http')
          .subscribe((res: any) => {
            this.tsService.error(res[fail.error]);
            this.companiesError = res[fail.error];
          });
        this.loading.dismiss();
      });
  }

  private sortByCode(list: Array<any>) {
    let sortList = list.sort((x,y) => {
      return x.code > y.code ? 1 : -1;
    });
    return sortList;
  }

  private formatRoles(roles: any, rolesLookup: any) {
    roles.forEach((r: any) => {
      this.roles[r.clientId] = [];
      r.roleIds.forEach((id: number) => {
        rolesLookup.forEach((l: any) => {
          if(l.key === id) 
            this.roles[r.clientId].push({
              value: l.value,
              id: id
            }); 
        });
      });
    });
  }

  private formatNodes(companies: any) {
    companies.forEach((c: any) => {
      let pids = [];
      if(c.children) {
        pids.push(c.id);
        this.formatChildNodes(c.children, pids);
      }
      if(c.id === this.company.id) {
        this.company = c;
      }
    });
  }

  private formatChildNodes(children: any, pids: any) {
    children.forEach((c: any) => {
      c.pids = [].concat(pids);
      c.pids.push(c.id);
      if(c.children) {
        this.formatChildNodes(c.children, c.pids);
      }
      if(c.id === this.company.id) {
        this.company = c;
        this.selectNode(c.pids, this.companies);
      }
    });
  }

  private selectNode(ids: Array<number>, list: any) {
    list.forEach((p: any) => {
      if(p.id === ids[0]) {
        this.selectCompany(p);
        let newIds = ids.slice(1);
        if(newIds.length > 0) {
          this.selectNode(newIds, p.children);
        }
      }
    });
  }

  ngOnInit() {
    // setting-server
    if(this.navCtrl.parent.parent) {
      this.state = 1;
    // auth-server
    } else {
      this.state = 0;
    }
  }
}
