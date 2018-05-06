import { Platform } from 'ionic-angular';
export declare class DeviceService {
    private platform;
    constructor(platform: Platform);
    isCordova(): boolean;
    isMobile(): boolean;
}
