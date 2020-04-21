import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Sala } from '../model/sala';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

  constructor(private http: HttpClient) { }

  public getSalas(): Promise<any> {
    return this._getSalas().toPromise()
      .then((data) => {
        let salas = Array<Sala>();

        if (data) {
          data.forEach(element => {
            let sala = new Sala();
            Object.assign(sala, element);
            salas.push(sala);
          });
        }
        return salas;
      })
  }

  private _getSalas() {
    return this.http.get(`https://localhost:44354/sala/ListarSalas`).pipe(catchError(e => of(e)))
  }
}
