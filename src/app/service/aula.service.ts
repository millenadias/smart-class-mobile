import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from '../model/usuario';
import { Aula } from '../model/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private http: HttpClient) { }

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

  public cadastrarAula(aula: Aula) {
   
    return this._cadastrarAula(aula).toPromise()
      .then((data: any) => {
        return data;
      })
      .catch((e) => { console.log(e); return { body: e.message, status: e.statusText } });
  }

  private _cadastrarAula(aula: Aula) {
    return this.http.post(`https://localhost:44354/aula/cadastrarAula`,
      JSON.stringify(aula)
    ).pipe(catchError(e => of(e)));
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
