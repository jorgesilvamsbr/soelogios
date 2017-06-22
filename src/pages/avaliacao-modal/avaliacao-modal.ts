import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';

@IonicPage()
@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {
  private locais: any;

  constructor(
    public viewCtrl: ViewController,
    private avaliacaoServico: AvaliacaoServico,
    private geolocalizacaoServico: GeolocalizacaoServico
  ) {
    this.locais = this.geolocalizacaoServico.obterLocais();
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  adicionaAvaliacao() {
    console.log("salva avaliacao");
    console.log(GeolocalizacaoServico.latitude);
  }
}
