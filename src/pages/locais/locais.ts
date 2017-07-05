import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AvaliacaoModalPage } from '../avaliacao-modal/avaliacao-modal';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';

@IonicPage()
@Component({
  selector: 'page-locais',
  templateUrl: 'locais.html',
})
export class LocaisPage {
  private locais: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private geolocalizacaoServico: GeolocalizacaoServico) {
    this.locais = this.navParams.get("locais");
  }

  selecionar(local) {
    AvaliacaoModalPage.localSelecionado = local;
    this.navCtrl.pop();
  }

  atualizarLocais(eventoRefreshed) {
    this.locais = this.geolocalizacaoServico.obterLocais();
    console.log(this.locais);
    setTimeout(() => {
      eventoRefreshed.complete();
    }, 2000);
  }
}
