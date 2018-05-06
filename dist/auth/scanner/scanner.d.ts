import { ViewController } from 'ionic-angular';
import { QRScanner } from '@ionic-native/qr-scanner';
export declare class Scanner {
    private qrScanner;
    private viewCtrl;
    light: boolean;
    private scanBody;
    constructor(qrScanner: QRScanner, viewCtrl: ViewController);
    ionViewDidLoad(): void;
    toggleLight(): void;
    showCamera(): void;
    hideCamera(): void;
    ionViewDidEnter(): void;
    ionViewWillLeave(): void;
}
