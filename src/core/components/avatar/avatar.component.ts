import { Component, Input } from '@angular/core';

@Component({
  selector: 'avatar',
  template: `<div class="avatar">{{name?nameAbrr():''}}</div>`
})
export class AvatarComponent {
  @Input() name: string;

  constructor() {}

  nameAbrr() {
    let name: string = '';
    if (this.name) {
      let regx = /\b[A-Za-z]/g;
      let abrr = this.name.match(regx).join('');
      name = abrr.substring(0,2).toUpperCase();
    }
    return name;
  }
}

