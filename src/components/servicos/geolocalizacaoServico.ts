import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../../components/util/loadingUtil';

@Injectable()
export class GeolocalizacaoServico {
    public static latitude: number;
    public static longitude: number;
    private chaveGoogleApi: string;
    private urlGoogleApi: string;
    locais = [];

    opcoes: {} = {
        timeout: 10000,
        enableHighAccuaracy: true
    };

    constructor(
        private http: Http,
        private loadingUtil: LoadingUtil,
        ) {
        this.chaveGoogleApi = "AIzaSyCal15CvfoASAG1OeSo4gJFsUeaJIxwTP0";
        this.urlGoogleApi = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?language=pt-BR&radius=150&key=" + this.chaveGoogleApi;
        this.ativarEspiao();
    }

    ativarEspiao() {
        Geolocation.watchPosition(this.opcoes).subscribe(posicao => {
            GeolocalizacaoServico.latitude = posicao.coords.latitude;
            GeolocalizacaoServico.longitude = posicao.coords.longitude;
            this.obterLocais();
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