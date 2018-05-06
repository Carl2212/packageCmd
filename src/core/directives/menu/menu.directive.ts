import { Directive, Input, HostListener, Renderer } from '@angular/core';

@Directive({ 
  selector: '[menuBtn]'
})

export class MenuDirective {
  @Input('menuBtn') side: string;
  @Input() act: string;

  private left: Element;
  private content: Element;
  private right: Element;
  
  constructor(private renderer:Renderer) {

  }
  
  @HostListener('click') 
  @HostListener('toggle')
  onClick() {
    this.checkElement();
    if (this.side == 'left') {
      this.toggleLeftMenu();
    } else if(this.side == 'right' && this.right) {
      this.toggleRightMenu(this.act);
    }
  }

  private checkElement():void {
    this.left = document.getElementById('left');
    this.content = document.getElementById('content');
    this.right = document.getElementById('right');
  }

  private toggleLeftMenu() {
    if (this.content.className.indexOf('open-left-cont') === -1) {
      this.renderer.setElementClass(this.left, 'open-left', true);
      this.renderer.setElementClass(this.content, 'open-left-cont', true);
    } else {
      this.renderer.setElementClass(this.left, 'open-left', false);
      this.renderer.setElementClass(this.content, 'open-left-cont', false);
    }
    if(this.right) {
      this.toggleRightMenu('close');
    }
  }

  private toggleRightMenu(act: string) {
    if (act == 'open') {
      this.renderer.setElementClass(this.right, 'open-right', true);
      this.renderer.setElementClass(this.content, 'open-left-cont', false);
      this.renderer.setElementClass(this.content, 'open-right-cont', true);
    } else if (act == 'close') {
      this.renderer.setElementClass(this.right, 'open-right', false);
      this.renderer.setElementClass(this.content, 'open-right-cont', false);
    }
  }
}
