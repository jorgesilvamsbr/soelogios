import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { AvaliacaoModalPage } from '../avaliacao-modal/avaliacao-modal';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  avaliacoes = [];

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public geolocalizacaoServico: GeolocalizacaoServico,
    public modalController: ModalController,
    public viewController: ViewController,
    private avaliacaoServico: AvaliacaoServico,
    private loadingUtil: LoadingUtil,
  ) {
  }

  ionViewDidEnter() {
    this.obterUltimasAvaliacoes();
  }

  public abrirModalAdicionaAvaliacao() {
    this.navCtrl.push(AvaliacaoModalPage);
  }

  public obterUltimasAvaliacoes() {
    this.loadingUtil.ativarLoading("Buscando últimos elogios");
    this.avaliacaoServico.getAvaliacoes().subscribe(avaliacoes => {
      this.avaliacoes = avaliacoes;
      this.loadingUtil.fecharLoading();
    }, error => { console.error('Erro: ' + error) });
  }

  public iniciarNavegacaoAteLocal(avaliacao) {
    let destino = {
      nome: avaliacao.nomeDaEmpresa,
      endereco: avaliacao.enderecoCompletoDaEmpresa,
    }
    this.geolocalizacaoServico.navegarAte(destino);
  }

  public atualizarPagina(eventoRefreshed){
    this.obterUltimasAvaliacoes();

    setTimeout(()=>{
      eventoRefreshed.complete();
    }, 2000);
  }
}
