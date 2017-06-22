import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


const config: BackgroundGeolocationConfig = {
    desiredAccuracy: 10,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: true,
    stopOnTerminate: false,
};

@Injectable()
export class GeolocalizacaoServico {
    public static latitude: any;
    public static longitude: any;
    private chaveGoogleApi: string;
    private urlGoogleApi: string;
    locais = [];

    opcoes: {} = {
        timeout: 10000,
        enableHighAccuaracy: true
    };

    constructor(private http: Http, private backgroundGeolocation: BackgroundGeolocation) {
        this.chaveGoogleApi = "AIzaSyCal15CvfoASAG1OeSo4gJFsUeaJIxwTP0";
        this.urlGoogleApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=pt-BR&radius=150&key=" + this.chaveGoogleApi;
    }

    sondarLocais() {
        this.backgroundGeolocation.configure(config)
            .subscribe((location: BackgroundGeolocationResponse) => {
                console.log(location);
                GeolocalizacaoServico.latitude = location.latitude;
                GeolocalizacaoServico.longitude = location.longitude;
                this.backgroundGeolocation.finish();
            });

        this.backgroundGeolocation.start();

        //this.backgroundGeolocation.stop();
    }

    ativarEspiao() {
        Geolocation.watchPosition(this.opcoes).subscribe(posicao => {
            GeolocalizacaoServico.latitude = posicao.coords.latitude;
            GeolocalizacaoServico.longitude = posicao.coords.longitude;
        });
        this.obterLocais();
    }

    obterLocais() {
        this.http
            .get(this.urlGoogleApi + "&location=" + GeolocalizacaoServico.latitude + "," + GeolocalizacaoServico.longitude)
            .map(response => response.json())
            .subscribe(data => {
                this.locais = data.results;
            });
        console.log(this.locais);
        return this.locais;
    }
}