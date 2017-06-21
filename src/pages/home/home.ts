import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { BotaoAdicionaAvaliacaoComponent } from '../../components/botao-adiciona-avaliacao/botao-adiciona-avaliacao';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public modalController: ModalController
  ) {}
}
