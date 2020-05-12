import { Component } from '@angular/core';
import { AulaService } from '../service/aula.service';
import { Aula } from '../model/aula';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  aulas: Aula[] = [];
  nomeUsuario: string = ""
  constructor(private aulaService: AulaService, private userService: UsuarioService) {}

  ngOnInit() {

    if (this.userService.dadosUsuarioLogado.dsNome != undefined) {
      let nome = this.userService.dadosUsuarioLogado.dsNome.split(" ");
      this.nomeUsuario = nome[0];
    } else this.nomeUsuario = "Lucas";

    this.aulaService.getAulasDiaProfessor(3).then(result => {
      this.aulas = result;
      
      this.aulas.forEach(item => {
        item.DtAula = new Date(item.DtAula);
        item.DtAulaFormatada = (item.DtAula.getDate()).toString() + "." + 
                              (item.DtAula.getMonth() + 1) + " - " +
        item.DtAula.getHours() + ":" + item.DtAula.getMinutes()
      })
    });
  }
}
