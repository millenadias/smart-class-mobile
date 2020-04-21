import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Disciplina } from '../model/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  constructor(private http: HttpClient) { }

  public getDisciplinas(): Promise<any> {
    return this._getDisciplinas().toPromise()
      .then((data) => {
        let disciplinas = Array<Disciplina>();

        if (data) {
          data.forEach(element => {
            let disciplina = new Disciplina();
            Object.assign(disciplina, element);
            disciplinas.push(disciplina);
          });
        }
        return disciplinas;
      })
  }

  private _getDisciplinas() {
    return this.http.get(`https://localhost:44354/disciplina/ListarDisciplinas`).pipe(catchError(e => of(e)))
  }
}
