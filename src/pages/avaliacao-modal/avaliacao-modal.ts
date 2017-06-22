import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { AvaliacaoServico } from '../../components/servicos/avaliacaoServico';
import { GeolocalizacaoServico } from '../../components/servicos/geolocalizacaoServico';
import { LoadingUtil } from '../../components/util/loadingUtil';

@IonicPage()
@Component({
  templateUrl: 'avaliacao-modal.html',
})
export class AvaliacaoModalPage {
  private locais: any;
  private avaliacao = {descricao: ''};
  private empresaSelecionada: any = {};

  constructor(
    public viewCtrl: ViewController,
    private avaliacaoServico: AvaliacaoServico,
    private geolocalizacaoServico: GeolocalizacaoServico,
    private loadingUtil: LoadingUtil,
  ) {
    this.locais = this.geolocalizacaoServico.obterLocais();
  }

  fechar() {
    this.viewCtrl.dismiss();
  }

  adicionaAvaliacao() {
    this.loadingUtil.ativarLoading("Seu elogio esta sendo enviado");
    let avaliacaoAdicionada = this.avaliacaoServico.adicionar(this.criarAvaliacao());
    this.loadingUtil.fecharLoading();
    this.fechar();
  }

  private criarAvaliacao(){
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
