import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Equipamento } from '../model/equipamento';

@Injectable({
  providedIn: 'root'
})
export class EquipamentoService {

  constructor(private http: HttpClient) { }

  public getEquipamentos(cdSala: number): Promise<any> {
    return this._getEquipamentos(cdSala).toPromise()
      .then((data) => {
        let equipamentos = Array<Equipamento>();        
        if (data) {          
          data.forEach(element => {
            let equipamento = new Equipamento();
            Object.assign(equipamento, element);
            equipamento.marcado = false;
            equipamentos.push(equipamento);
          });
        }
        return equipamentos;
      });
  }

  private _getEquipamentos(cdSala: number) {
    return this.http.get(`https://localhost:44354/equipamento/ListarEquipamentos`, 
    {
      params: {
        "pCdSala": cdSala.toString()
    }
  }).pipe(catchError(e => of(e)))
  }

}
