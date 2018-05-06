import { Renderer } from '@angular/core';
export declare class MenuDirective {
    private renderer;
    side: string;
    act: string;
    private left;
    private content;
    private right;
    constructor(renderer: Renderer);
    onClick(): void;
    private checkElement();
    private toggleLeftMenu();
    private toggleRightMenu(act);
}
