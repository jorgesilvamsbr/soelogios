import { Injectable } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingUtil } from '../../components/util/loadingUtil';
import { Platform } from 'ionic-angular';

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
        private platform: Platform,
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

    obterLocaisDaRegiaoAtual(){
        var locaisAtuais;
        this.loadingUtil.ativarLoading("Buscando locais...");
        Geolocation.getCurrentPosition(this.opcoes).then(posicao => {
            GeolocalizacaoServico.latitude = posicao.coords.latitude;
            GeolocalizacaoServico.longitude = posicao.coords.longitude;
            locaisAtuais = this.obterLocais();
            this.loadingUtil.fecharLoading();
        });
        return locaisAtuais;
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

    //Documentação: https://gist.github.com/Bloggerschmidt/aec7ed3dae3262d975d6d53009ef6aa8
    navegarAte(destino) {
        this.platform.ready().then(() => {
            this.loadingUtil.ativarLoading("Preparando rota...");
            Geolocation.getCurrentPosition().then((position) => {
                // ios
                if (this.platform.is('ios')) {
                    window.open('maps://?q=' + destino.nome + '&saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + destino.endereco, '_system');
                };
                // android
                if (this.platform.is('android')) {
                    window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + destino.endereco , '_system');
                };
                this.loadingUtil.fecharLoading();
            });
        });
    };
}