import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public Teste() {
    return this.teste().toPromise()
    .then((data) => {
      console.log("teste millena");
      console.log(data['acesso']);
      
    })
  }
  private teste(){
    return this.http.get(`https://localhost:44354/usuario/validarAcesso`,
    {
      params: {
        "pDsLogin": "millena.dias",
        "pDsSenha": "testeSenha"
      }
    }).pipe(catchError(e => of(e)))
  }
}
