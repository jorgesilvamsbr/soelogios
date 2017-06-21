import { Component } from '@angular/core';
import { AvaliacaoServico } from '../servicos/avaliacaoServico';

@Component({
  selector: 'avaliacoes',
  templateUrl: 'avaliacoes.html'
})
export class AvaliacoesComponent {
  avaliacoes = [];

  constructor(private avaliacaoServico: AvaliacaoServico) {
    this.avaliacaoServico.getAvaliacoes()
      .subscribe(
        avaliacoes => this.avaliacoes = avaliacoes,
        error => console.error('Error: ' + error)
      );
  }
}