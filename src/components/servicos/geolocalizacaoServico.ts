import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Geolocation, Geoposition } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class GeolocalizacaoServico {
    public static latitude: any;
    public static longitude: any;
    locais= [];
    private chaveGoogleApi: string;
    private urlGoogleApi: string;

    opcoes: {} = {
        timeout: 10000,
        enableHighAccuaracy: true
    };

    constructor(private http: Http) {
        this.chaveGoogleApi = "AIzaSyCal15CvfoASAG1OeSo4gJFsUeaJIxwTP0";
        this.urlGoogleApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=pt-BR&radius=150&key=" + this.chaveGoogleApi;
    }

    ativarEspiao() {
        Geolocation.watchPosition(this.opcoes).subscribe(posicao => {
            GeolocalizacaoServico.latitude = posicao.coords.latitude;
            GeolocalizacaoServico.longitude = posicao.coords.longitude;
            console.log(posicao);
        });
    }

    obterLocais() {
        this.http
            .get(this.urlGoogleApi + "&location=" + GeolocalizacaoServico.latitude + "," + GeolocalizacaoServico.longitude)
            .map(response => response.json())
            .subscribe(data => {
                this.locais = data.results;
            });
        return this.locais;
    }
}