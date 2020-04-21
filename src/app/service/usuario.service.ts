import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public dadosUsuarioLogado: Usuario = new Usuario();

  constructor(private http: HttpClient) { }

  public verificarAcesso(login: string, senha: string): Promise<any> {
    return this._verificarAcesso(login, senha).toPromise()
      .then((data) => {
        return data;
      })
  }
  private _verificarAcesso(login: string, senha: string) {

    return this.http.get(`https://localhost:44354/usuario/validarAcesso`,
      {
        params: {
          "pDsLogin": login,
          "pDsSenha": senha
        }
      }).pipe(catchError(e => of(e)))
  }

  public getDadosUsuario(login: string, senha: string): Promise<any> {
    return this._getDadosUsuario(login, senha).toPromise()
      .then((data) => {
        let user: Usuario = new Usuario();

        if (data)
          Object.assign(user, data)    
        
         this.dadosUsuarioLogado = user;
        return user;
      })
  }

  private _getDadosUsuario(login: string, senha: string) {
    return this.http.get(`https://localhost:44354/usuario/GetPorLoginSenha`,
      {
        params: {
          "pDsLogin": login,
          "pDsSenha": senha
        }
      }).pipe(catchError(e => of(e)))
  }
}
