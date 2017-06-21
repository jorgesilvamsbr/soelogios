import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AvaliacaoModalPage } from '../../pages/avaliacao-modal/avaliacao-modal';

@Component({
  selector: 'botao-adiciona-avaliacao',
  templateUrl: 'botao-adiciona-avaliacao.html'
})
export class BotaoAdicionaAvaliacaoComponent {

  constructor(
    public modalController: ModalController
  ) { }

  abrirModalAdicionaAvaliacao() {
    let modal = this.modalController.create(AvaliacaoModalPage);
    modal.present();
  }
}