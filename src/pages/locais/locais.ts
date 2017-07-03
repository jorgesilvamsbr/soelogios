import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AvaliacaoModalPage } from '../avaliacao-modal/avaliacao-modal';

@IonicPage()
@Component({
  selector: 'page-locais',
  templateUrl: 'locais.html',
})
export class LocaisPage {
  private locais: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.locais = this.navParams.get("locais");
  }

  selecionar(local){
    AvaliacaoModalPage.localSelecionado = local;
    this.navCtrl.pop();
  }
}
