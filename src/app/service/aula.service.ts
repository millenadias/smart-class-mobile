import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Aula } from '../model/aula';
import { AlertController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient, public alertController: AlertController, private navCtrl: NavController) { }

  public getAulasProfessor(cdProfessor: number): Promise<any> {
    return this._getAulasProfessor(cdProfessor).toPromise()
      .then((data) => {
        let aulas = Array<Aula>();

        if (data) {
          data.forEach(element => {
            let aula = new Aula();
            Object.assign(aula, element);
            aulas.push(aula);
          });
        }

        return aulas;
      })
  }

  private _getAulasProfessor(cdProfessor: number) {
    return this.http.get(`https://localhost:44354/aula/ListarAulasProfessor`,
      {
        params: {
          "pCdProfessor": cdProfessor.toString()
        }
      }).pipe(catchError(e => of(e)))
  }


  public getAulasDiaProfessor(cdProfessor: number): Promise<any> {
    return this._getAulasDiaProfessor(cdProfessor).toPromise()
      .then((data) => {
        let aulas = Array<Aula>();

        if (data) {
          data.forEach(element => {
            let aula = new Aula();
            Object.assign(aula, element);
            aulas.push(aula);
          });
        }

        return aulas;
      })
  }

  private _getAulasDiaProfessor(cdProfessor: number) {
    return this.http.get(`https://localhost:44354/aula/ListarAulasDiaProfessor`,
      {
        params: {
          "pCdProfessor": cdProfessor.toString()
        }
      }).pipe(catchError(e => of(e)))
  }
  public cadastrarAula(aula: Aula) {

    return this._cadastrarAula(aula).toPromise()
      .then((data: any) => {
        if (data == 'A aula foi cadastrada!')
          this.presentAlert(true);
        else
          this.presentAlert(false);

        return data;
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  }

  private _cadastrarAula(aula: Aula) {
    console.log('aula service', aula);

    return this.http.post(`https://localhost:44354/aula/cadastrarAula`,
      aula
    ).pipe(catchError(e => of(e)));
  }

  async presentAlert(response) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: response == true ? 'A aula foi cadastrada com sucesso!' : 'Erro ao cadastrar aula, entre em contato com um administrador!',
      buttons: [{ text: 'OK', handler: () => { this.navCtrl.navigateRoot('tabs/aulas') } }]
    });
    alert.present();
  }

  public getAula(cdAula: number) {
    return this._getAula(cdAula).toPromise()
      .then((data) => {
        let aula = new Aula();

        if (data)
          aula = data;

        return aula;
      })
  }

  private _getAula(cdAula: number) {
    return this.http.get(`https://localhost:44354/aula/getAula`,
      {
        params: {
          "CdAula": cdAula.toString()
        }
      }).pipe(catchError(e => of(e)))
  }
}
