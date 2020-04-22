import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Usuario } from '../model/usuario';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public dadosUsuarioLogado: Usuario = new Usuario();

  constructor(private http: HttpClient, public alertController: AlertController, private navCtrl: NavController) { }

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

  public cadastrarUsuario(usuario: Usuario) {

    return this._cadastrarUsuario(usuario).toPromise()
      .then((data: any) => {
        console.log(data);
        if (data == 'Usuário Cadastrado') {
          this.presentAlert(true);
        }
        else {
          this.presentAlert(false);
        }
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  }

  public _cadastrarUsuario(usuario: Usuario) {
    return this.http.post(`https://localhost:44354/usuario/cadastrar`,
      usuario
    ).pipe(catchError(e => of(e)));
  }

  async presentAlert(response) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: response == true ? 'O usuário foi cadastrado com sucesso!' : 'Erro ao cadastrar o usuário, entre em contato com um administrador!',
      buttons: [{ text: 'OK', handler: () => { this.navCtrl.navigateRoot('login') } }]
    });
    alert.present();
  }
}
