import { Component, OnInit } from "@angular/core";
import { NavController } from '@ionic/angular';
import { TurmaService } from '../service/turma.service';
import { Turma } from '../model/turma';

@Component({
  selector: "app-turma",
  templateUrl: "./turma.page.html",
  styleUrls: ["./turma.page.scss"],
})
export class TurmaPage implements OnInit {
  turmas: Turma[] = [];
  constructor(private navCtrl: NavController, private turmaService: TurmaService) {}

  ngOnInit() {

    this.turmaService.getTurmas().then(result=>{
      this.turmas = result;
  })
  }

  detalheTurma(valor) {
    this.navCtrl.navigateRoot('tabs/visualiza-turma');
  }
}
