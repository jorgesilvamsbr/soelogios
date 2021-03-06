import { Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { App, ViewController, NavController, NavParams } from 'ionic-angular';

import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';

import { LocaisPage } from '../locais/locais';

@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {
  private locais: any;
  private avaliacao = { descricao: '', foto: '' };
  public foto: string;
  public static localSelecionado: any;
  public static primeiroLocalSelecionado: any;
  private empresaSelecionada: any;

  opcoesCamera: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public viewCtrl: ViewController,
    private avaliacaoServico: AvaliacaoServico,
    private geolocalizacaoServico: GeolocalizacaoServico,
    private loadingUtil: LoadingUtil,
    private navCtrl: NavController,
    private camera: Camera,
    private app: App,
    private navParams: NavParams,
  ) {
    this.locais = this.navParams.get("locaisObtidos");
    console.log("dentro");
    console.log(this.locais);
    this.empresaSelecionada = this.locais[1];
  }

  ionViewDidEnter() {
    if (AvaliacaoModalPage.localSelecionado) {
      this.empresaSelecionada = AvaliacaoModalPage.localSelecionado;
    }
  }

  public obterFoto() {
    this.camera.getPicture(this.opcoesCamera).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.avaliacao.foto = this.foto;
    }, (err) => {
      console.log(err);
    });
  }

  public adicionaAvaliacao() {
    this.loadingUtil.ativarLoading("Seu elogio esta sendo enviado");
    this.avaliacaoServico.adicionar(this.criarAvaliacao());
    this.loadingUtil.fecharLoading();
    this.fechar();
  }

  public fechar() {
    this.viewCtrl.dismiss();
  }

  public alterarLocal() {
    this.navCtrl.push(LocaisPage, { locais: this.locais });
  }

  private criarAvaliacao() {
    let avaliacaoRequest = {
      id: "",
      imagem: this.avaliacao.foto,
      descricao: this.avaliacao.descricao,
      avaliacao: "ELOGIO",
      usuarioRequest: {
        id: 1
      },
      idApiGoogle: this.empresaSelecionada.id,
      urlIconeApiGoogle: this.empresaSelecionada.icon,
      empresaRequest: {
        nome: this.empresaSelecionada.name,
        ramo: "SEM_RAMO",
        enderecoDTO: {
          cep: "",
          enderecoCompleto: this.empresaSelecionada.vicinity,
          municipio: {
            nome: "Campo Grande"
          }
        }
      }
    }
    return avaliacaoRequest;
  }
}
