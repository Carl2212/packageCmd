import { HttpClient } from "@angular/common/http";
import { NavController, NavParams, Select } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/providers/toast.service';
import { LoadingService } from '../../core/providers/loading.service';
import { ProfileService } from "../../core/providers/profile/profile.service";
export declare class Company {
    private tlService;
    private navCtrl;
    private authService;
    private http;
    private tsService;
    private loading;
    private navParams;
    private profileService;
    state: number;
    companies: Array<any>;
    roles: any;
    company: any;
    roleId: number;
    companiesError: string;
    private clientId;
    private profile;
    roleSelect: Select;
    constructor(tlService: TranslateService, navCtrl: NavController, authService: AuthService, http: HttpClient, tsService: ToastService, loading: LoadingService, navParams: NavParams, profileService: ProfileService);
    selectCompany(c: any): void;
    hasChild(c: any): boolean;
    getIcon(c: any): "company" | "folder" | "comp-profitcenter";
    getRoles(c: any): any;
    save(): void;
    private init();
    private getCompanies();
    private sortByCode(list);
    private formatRoles(roles, rolesLookup);
    private formatNodes(companies);
    private formatChildNodes(children, pids);
    private selectNode(ids, list);
    ngOnInit(): void;
}
