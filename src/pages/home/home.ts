import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public geolocalizacaoServico: GeolocalizacaoServico
  ) {
  }
}
