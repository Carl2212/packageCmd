import { ToastController } from 'ionic-angular';
export declare class ToastService {
    private toastCtrl;
    constructor(toastCtrl: ToastController);
    success(msg: string): void;
    warning(msg: string): void;
    error(msg: string): void;
}
