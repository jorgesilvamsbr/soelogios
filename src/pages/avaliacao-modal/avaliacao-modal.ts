import { Component, Inject } from '@angular/core';
import { App, ViewController, NavController } from 'ionic-angular';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';

@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {
  private locais: any;
  private avaliacao = { descricao: '', foto: '' };
  private empresaSelecionada: any;
  public foto: string;

  opicoesCamera: CameraOptions = {
    quality: 60,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(public viewCtrl: ViewController, private avaliacaoServico: AvaliacaoServico, private geolocalizacaoServico: GeolocalizacaoServico,
    private loadingUtil: LoadingUtil, private navCtrl: NavController, private camera: Camera, private app: App
  ) {
    this.locais = this.geolocalizacaoServico.obterLocais();
    this.empresaSelecionada = this.locais[1];
  }

  ionViewDidEnter(){
    console.log("Estou na pagina da avaliacao modal");
  }
  public obterLocaisDaRegiaoAtual(){
    this.locais = this.geolocalizacaoServico.obterLocaisDaRegiaoAtual();
  }

  public obterFoto() {
    this.camera.getPicture(this.opicoesCamera).then((imageData) => {
      this.foto = 'data:image/jpeg;base64,' + imageData;
      this.avaliacao.foto = this.foto;
      console.log(this.foto);
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
