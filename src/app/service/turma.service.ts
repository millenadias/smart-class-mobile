import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Turma } from '../model/turma';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurmaService {

  constructor(private http: HttpClient) { }

  public getTurmas(): Promise<any> {
    return this._getTurmas().toPromise()
      .then((data) => {
        let turmas = Array<Turma>();

        if (data) {
          data.forEach(element => {
            let turma = new Turma();
            Object.assign(turma, element);
            turmas.push(turma);
          });
        }
        return turmas;
      })
  }

  private _getTurmas() {
    return this.http.get(`https://localhost:44354/turma/ListarTurmas`).pipe(catchError(e => of(e)))
  }
}
