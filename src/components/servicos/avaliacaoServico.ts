import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AvaliacaoServico{

    private url: string = "http://soelogios.herokuapp.com/avaliacoes"
    //private url: string = "http://0.0.0.0:8080/avaliacoes";

    constructor(private http: Http) { }
  
  getAvaliacoes() {
    return this.http.get(this.url)
      .map(response => response.json());
  }

  adicionar(avaliacaoRequest: any){
    return this.http.post(this.url, avaliacaoRequest)
    .subscribe(resposta => resposta.json());
  }
}