import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AvaliacaoServico{
    constructor(private http: Http) { }
  
  getAvaliacoes() {
    return this.http.get('http://soelogios.herokuapp.com/avaliacoes')
      .map(response => response.json());
  }
}