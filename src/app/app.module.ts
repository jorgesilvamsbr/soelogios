import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';

import { AvaliacaoServico } from '../components/servicos/avaliacaoServico';
import { EmpresaServico } from '../components/servicos/empresaServico';
import { GeolocalizacaoServico } from '../components/servicos/geolocalizacaoServico';
import { LoadingUtil } from '../components/util/loadingUtil';

import { MyApp } from './app.component';
import { AvaliacaoModalPage } from '../pages/avaliacao-modal/avaliacao-modal';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LocaisPage } from '../pages/locais/locais';
import { NativeStorage } from '@ionic-native/native-storage';
import { Facebook } from '@ionic-native/facebook';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AvaliacaoModalPage,
    LocaisPage,
    LoginPage,
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
    LocaisPage,
    AvaliacaoModalPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AvaliacaoServico,
    EmpresaServico,
    GeolocalizacaoServico,
    LoadingUtil,
    Camera,
    NativeStorage,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
