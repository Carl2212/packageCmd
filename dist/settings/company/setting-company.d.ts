import { NavController, ViewController } from "ionic-angular";
import { AuthService } from "../../auth/auth.module";
export declare class SettingCompany {
    private navCtrl;
    private authService;
    private viewCtrl;
    company: NavController;
    constructor(navCtrl: NavController, authService: AuthService, viewCtrl: ViewController);
    ngOnInit(): void;
}
