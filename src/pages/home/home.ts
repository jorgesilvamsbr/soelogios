import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { MenuComponent } from '../../components/menu/menu';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public geolocalizacaoServico: GeolocalizacaoServico,
    public menu: MenuComponent,
  ) {
    this.menu.habilitarMenu();
  }
}
