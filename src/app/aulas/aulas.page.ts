import { Component, OnInit } from '@angular/core';
import { Aula } from '../model/aula';
import { AulaService } from '../service/aula.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.page.html',
  styleUrls: ['./aulas.page.scss'],
})
export class AulasPage implements OnInit {

  aulas: Aula[] = [];
  constructor(private aulaService: AulaService, private navCtrl: NavController) { }

  ngOnInit() {

    let aula1 = new Aula();
    aula1.dsDisciplina = "Disciplina 1";
    aula1.dsSemestre = 1;
    aula1.dtAula = new Date();
    aula1.dsSala = "Sala 1";
    this.aulas.push(aula1);

    let aula2 = new Aula();
    aula2.dsDisciplina = "Disciplina 2";
    aula2.dsSemestre = 2;
    aula2.dtAula = new Date();
    aula2.dsSala = "Sala 2";
    this.aulas.push(aula2);
    /*this.aulaService.getAulasProfessor(3).then(result => {
      this.aulas = result;
    });*/

    
  }

  cadastrarAula() {
    this.navCtrl.navigateRoot('aula');
  }

  editarAula() {
    /*this.aulaService.getAula(1).then(result => {

    })*/
    this.navCtrl.navigateRoot('aula' + '?cdAula=10');
  }
}
