import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoModalPage } from './avaliacao-modal';

@NgModule({
  declarations: [
    AvaliacaoModalPage,
  ],
  imports: [
    IonicPageModule.forChild(AvaliacaoModalPage),
  ],
  exports: [
    AvaliacaoModalPage
  ]
})
export class AvaliacaoModalPageModule {}
