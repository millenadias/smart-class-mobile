import { Component, OnInit } from '@angular/core';
import { Aula } from '../model/aula';
import { AulaService } from '../service/aula.service';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.page.html',
  styleUrls: ['./aulas.page.scss'],
})
export class AulasPage implements OnInit {

  aulas: Aula[] = [];
  nomeUsuario: String = ""
  constructor(private aulaService: AulaService, 
    private navCtrl: NavController,
    private userService: UsuarioService) { }

  ngOnInit() {
    console.log(this.userService.dadosUsuarioLogado.dsNome);
    
    if (this.userService.dadosUsuarioLogado.dsNome != undefined) {
      let nome = this.userService.dadosUsuarioLogado.dsNome.split(" ")
      this.nomeUsuario = nome[0];
    } else
      this.nomeUsuario = 'Lucas'
   
    /*let aula1 = new Aula();
    aula1.dsDisciplina = "Disciplina 1";
    aula1.dsSemestre = 1;
    aula1.dtAula = new Date();
    aula1.dsSala = "Sala 1";
    aula1.dtAulaFormatada = aula1.dtAula.getDate() + "." + (aula1.dtAula.getMonth() + 1) + " - " + aula1.dtAula.getTime()
    this.aulas.push(aula1);

    let aula2 = new Aula();
    aula2.dsDisciplina = "Disciplina 2";
    aula2.dsSemestre = 2;
    aula2.dtAula = new Date();
    aula2.dsSala = "Sala 2";
    aula2.dtAulaFormatada = aula1.dtAula.getDate() + "." + (aula1.dtAula.getMonth() + 1) + " - " +
     aula1.dtAula.getHours() + ":" + aula1.dtAula.getMinutes()
    console.log(aula1.dtAula);
    
    this.aulas.push(aula2);
    */
    this.aulaService.getAulasProfessor(3).then(result => {
      this.aulas = result;
      
      this.aulas.forEach(item => {
        item.DtAula = new Date(item.DtAula);
        item.DtAulaFormatada = (item.DtAula.getDate()).toString() + "." + 
                              (item.DtAula.getMonth() + 1) + " - " +
        item.DtAula.getHours() + ":" + item.DtAula.getMinutes()
      })
    });

    
  }

  cadastrarAula() {
    this.navCtrl.navigateRoot('aula');
  }

  editarAula() {
    
    this.navCtrl.navigateRoot('aula' + '?cdAula=10');
  }
}
