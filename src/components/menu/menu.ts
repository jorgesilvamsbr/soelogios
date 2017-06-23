import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {

  constructor(private menu: MenuController) {
  }

  habilitarMenu() {
    this.menu.enable(true);
  }
}