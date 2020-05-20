import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Aula } from '../model/aula';
import { AlertController, NavController } from '@ionic/angular';
import { Equipamento } from '../model/equipamento';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  public codigoAula: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private urlApi: string = "https://localhost:44354/aula/ListarAulasProfessor";
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
  public cadastrarAula(aula: Aula, equipamentos: Array<number>) {

    return this._cadastrarAula(aula).toPromise()
      .then((data: any) => {        
        if (data != '0') {
          this._cadastrarPreferencia(data, equipamentos).toPromise().then(result => {
            this.presentAlert(true);
          })
        }
        else
          this.presentAlert(false);

        return data;
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  }

  public alterarAula(aula: Aula, equipamentos: Array<number>) {

    return this._alterarAula(aula).toPromise()
      .then((data: any) => {
        if (data == 'A aula foi alterada!') {
          this._cadastrarPreferencia(aula.CdAula, equipamentos).toPromise().then(result => {
            this.alertValidacao("Aula alterada com sucesso!.");
            this.navCtrl.navigateRoot('tabs/aulas')
          });
        }
        else
          this.alertValidacao("Erro ao cadastrar aula, entre em contato com um administrador!");
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  }

  private _alterarAula(aula: Aula) {
    console.log("entrou no alterar");
    
    return this.http.put(`https://localhost:44354/aula/alterarAula`, aula
    ).pipe(catchError(e => of(e)));
  }

  private _cadastrarAula(aula: Aula) {
    return this.http.post(`https://localhost:44354/aula/cadastrarAula`, aula
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

  async alertValidacao(mensagem) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensagem,
      buttons: [{ text: 'OK', handler: () => { close() } }]
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

  private _cadastrarPreferencia(cdAula: number, equipamentos: Array<number>) {

    return this.http.post(`https://localhost:44354/aula/cadastrarPreferenciasAula/${cdAula}`, equipamentos
    ).pipe(catchError(e => of(e)));

    
  }

  private _validarAulaPermitida(cdSala: number, dtIni: Date, dtFim: Date, cdAula: number) {
    return this.http.get(`https://localhost:44354/aula/ValidarAulaPermitida`,
    { 
      params: {
        "cdSala": cdSala.toString(),
        "dtIni": dtIni.toString(),
        "dtFim": dtFim.toString(),
        "cdAula": cdAula.toString()
      }
    }).pipe(catchError(e => of(e)))
  }

  public validarAulaPermitida(cdSala: number, dtIni: Date, dtFim: Date, cdAula: number) {
    return this._validarAulaPermitida(cdSala, dtIni, dtFim, cdAula).toPromise()
      .then((data) => {
        return data;
      })
  }

  public carregarPreferencias(cdAula: number) {
    return this._carregarPreferencias(cdAula).toPromise()
    .then((data) => {
      let preferencias = Array<number>();

      if (data) {
        data.forEach(element => {
          preferencias.push(element);
        });
      }
      return preferencias;
    })
  }

  private _carregarPreferencias(cdAula: number) {
    return this.http.get(`https://localhost:44354/aula/ListarPreferencias`,
    { 
      params: {
        "cdAula": cdAula.toString()
      }
    }).pipe(catchError(e => of(e)))
  }

}
