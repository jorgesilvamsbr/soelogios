import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, nativeStorage: NativeStorage) {
    platform.ready().then(() => {
    
      nativeStorage.getItem('usuarioSoElogios')
      .then(data => {
        this.rootPage = HomePage;
        statusBar.styleDefault();
        splashScreen.hide();
      }, error => {
        this.rootPage = LoginPage;
        statusBar.styleDefault();
        splashScreen.hide();
      });

    });
  }
}

