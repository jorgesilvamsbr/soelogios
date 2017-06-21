import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  fechar() {
    this.viewCtrl.dimiss();
  }

}
