import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AvaliacaoServico } from '../components/servicos/avaliacaoServico';
import { EmpresaServico } from '../components/servicos/empresaServico';
import { GeolocalizacaoServico } from '../components/servicos/geolocalizacaoServico';
import { BotaoAdicionaAvaliacaoComponent } from '../components/botao-adiciona-avaliacao/botao-adiciona-avaliacao';
import { AvaliacaoModalPage } from '../pages/avaliacao-modal/avaliacao-modal';
import { LoadingUtil } from '../components/util/loadingUtil';
import { MenuComponent } from '../components/menu/menu';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BotaoAdicionaAvaliacaoComponent,
    AvaliacaoModalPage,
    MenuComponent,
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
    AvaliacaoModalPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AvaliacaoServico,
    EmpresaServico,
    GeolocalizacaoServico,
    LoadingUtil,
    MenuComponent,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
