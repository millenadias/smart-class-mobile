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
}
