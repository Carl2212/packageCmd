import { EventEmitter } from '@angular/core';
export declare class WarningComponent {
    msg: string;
    btn: string;
    event: EventEmitter<{}>;
    constructor();
    pushBtn(): void;
}
