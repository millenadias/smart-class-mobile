import { Component, OnInit } from "@angular/core";
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-turma",
  templateUrl: "./turma.page.html",
  styleUrls: ["./turma.page.scss"],
})
export class TurmaPage implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  detalheTurma(valor) {
    this.navCtrl.navigateRoot('tabs/visualiza-turma');
  }
}
