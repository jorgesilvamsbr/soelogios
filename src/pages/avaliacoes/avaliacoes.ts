import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';

@Component({
  selector: 'avaliacoes',
  templateUrl: 'avaliacoes.html'
})
export class AvaliacoesPage {
  avaliacoes = [];

  constructor(
    private avaliacaoServico: AvaliacaoServico,
    private loadingUtil: LoadingUtil,
    private geolocalizacaoServio: GeolocalizacaoServico,
    private navCtrl: NavController,
  ) {
    this.loadingUtil.ativarLoading("Buscando últimos elogios");
    this.avaliacaoServico.getAvaliacoes()
      .subscribe(avaliacoes => {
        this.avaliacoes = avaliacoes;
        this.loadingUtil.fecharLoading();
      }, error => {
        console.error('Erro: ' + error)
      });
  }

  public iniciarNavegacaoAteLocal(avaliacao) {
    let destino = {
      nome: avaliacao.nomeDaEmpresa,
      endereco: avaliacao.enderecoCompletoDaEmpresa,
    }
    this.geolocalizacaoServio.navegarAte(destino);
  }


  ionViewDidEnter() {
    console.log("Did Enter tela avaliacoes...");
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}