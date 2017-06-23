import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {
  private locais: any;
  private avaliacao = { descricao: '', foto: '' };
  private empresaSelecionada: any = {};
  public base64Image: string;
  opicoesCamera: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    public viewCtrl: ViewController,
    private avaliacaoServico: AvaliacaoServico,
    private geolocalizacaoServico: GeolocalizacaoServico,
    private loadingUtil: LoadingUtil,
    private navCtrl: NavController,
    private camera: Camera,
  ) {
    this.locais = this.geolocalizacaoServico.obterLocais();
  }

  obterFoto() {
    this.camera.getPicture(this.opicoesCamera).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      this.avaliacao.foto = this.base64Image;
    }, (err) => {
    });
  }

  adicionaAvaliacao() {
    this.loadingUtil.ativarLoading("Seu elogio esta sendo enviado");
    this.avaliacaoServico.adicionar(this.criarAvaliacao());
    this.loadingUtil.fecharLoading();
    this.fechar();
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  private criarAvaliacao() {
    let avaliacaoRequest = {
      id: "",
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
