import { FormControl } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { NavStack } from '../../core/providers/nav.service';
import { AuthService } from '../auth.service';
export declare class Server {
    private navCtrl;
    private authService;
    private navStack;
    serverCtrl: FormControl;
    constructor(navCtrl: NavController, authService: AuthService, navStack: NavStack);
    scan(): void;
    apply(): void;
    private initForm();
    ngOnInit(): void;
}
