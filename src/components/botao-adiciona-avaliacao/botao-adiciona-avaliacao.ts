import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';

import { AvaliacaoModalPage } from '../../pages/avaliacao-modal/avaliacao-modal';
import { HomePage } from '../../pages/home/home';
import { AvaliacoesComponent } from '../../components/avaliacoes/avaliacoes';

@Component({
  selector: 'botao-adiciona-avaliacao',
  templateUrl: 'botao-adiciona-avaliacao.html'
})
export class BotaoAdicionaAvaliacaoComponent {

  constructor(
    public modalController: ModalController,
    private navCtrl: NavController,
  ) { }

  abrirModalAdicionaAvaliacao() {
    let modal = this.modalController.create(AvaliacaoModalPage);
    modal.onDidDismiss(() => {
      AvaliacoesComponent;
    });
    modal.present();
  }
}