import { Component } from '@angular/core';
import { AvaliacaoServico } from '../servicos/avaliacaoServico';
import { LoadingUtil } from '../util/loadingUtil';

@Component({
  selector: 'avaliacoes',
  templateUrl: 'avaliacoes.html'
})
export class AvaliacoesComponent {
  avaliacoes = [];

  constructor(
    private avaliacaoServico: AvaliacaoServico,
    private loadingUtil: LoadingUtil
  ) {
    this.loadingUtil.ativarLoading("Buscando últimos elogios");
    this.avaliacaoServico.getAvaliacoes()
      .subscribe(
      avaliacoes => {
        this.avaliacoes = avaliacoes;
        this.loadingUtil.fecharLoading();
      },
      error => console.error('Error: ' + error)
      );
  }
}