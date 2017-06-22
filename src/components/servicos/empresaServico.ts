import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmpresaServico {
  constructor(private http: Http) { }
  
  obterEmpresas() {
    return this.http.get('http://soelogios.herokuapp.com/empresas')
      .map(response => response.json());
  }
}