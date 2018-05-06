import { EventEmitter } from '@angular/core';
export declare class NoContent {
    warningIcon: string;
    msg: any;
    btn: boolean;
    event: EventEmitter<any>;
    msgKey: string;
    constructor();
    refreshEvent(): void;
}
