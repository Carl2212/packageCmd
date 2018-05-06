import { NavController, NavParams } from 'ionic-angular';
import { LoadingService } from "../../core/providers/loading.service";
import { ProfileService } from "../../core/providers/profile/profile.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastService } from "../../core/providers/toast.service";
import { profileStruct } from "../../core/providers/profile/profile.store";
import { AuthService } from "../auth.service";
export declare class Profile {
    navCtrl: NavController;
    navParams: NavParams;
    private loading;
    private pfService;
    private tlService;
    private tsService;
    private authService;
    profilegroup: Array<profileStruct>;
    constructor(navCtrl: NavController, navParams: NavParams, loading: LoadingService, pfService: ProfileService, tlService: TranslateService, tsService: ToastService, authService: AuthService);
    ionViewDidLoad(): void;
    loginWithProfile(profile: profileStruct): void;
}
