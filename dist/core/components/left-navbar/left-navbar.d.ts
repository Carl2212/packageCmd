import { EventEmitter } from '@angular/core';
import { CoreStore } from '../../core.module';
import { DeviceService } from '../../providers/device.service';
export declare class LeftNavbar {
    dvService: DeviceService;
    private store;
    name: string;
    directiveType: string;
    leftBtn: EventEmitter<{}>;
    constructor(dvService: DeviceService, store: CoreStore);
    next(): void;
    ngOnInit(): void;
}
