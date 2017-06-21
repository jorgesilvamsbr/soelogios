import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AvaliacoesComponent } from '../components/avaliacoes/avaliacoes';
import { AvaliacaoServico } from '../components/servicos/avaliacaoServico';
import { BotaoAdicionaAvaliacaoComponent } from '../components/botao-adiciona-avaliacao/botao-adiciona-avaliacao';
import { AvaliacaoModalPage } from '../pages/avaliacao-modal/avaliacao-modal';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AvaliacoesComponent,
    BotaoAdicionaAvaliacaoComponent,
    AvaliacaoModalPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AvaliacaoModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AvaliacaoServico,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
