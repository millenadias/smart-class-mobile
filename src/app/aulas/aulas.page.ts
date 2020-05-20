import { Component, OnInit } from "@angular/core";
import { Aula } from "../model/aula";
import { AulaService } from "../service/aula.service";
import { NavController } from "@ionic/angular";
import { UsuarioService } from "../service/usuario.service";
import { NavigationExtras } from '@angular/router';

@Component({
  selector: "app-aulas",
  templateUrl: "./aulas.page.html",
  styleUrls: ["./aulas.page.scss"],
})
export class AulasPage implements OnInit {
  aulas: Aula[] = [];
  nomeUsuario: String = "";
  constructor(
    private aulaService: AulaService,
    private navCtrl: NavController,
    private userService: UsuarioService
  ) {}

  ngOnInit() {
    this.listarAulas();
  }

  listarAulas() {
    this.aulaService.getAulasProfessor(this.userService.dadosUsuarioLogado.cdUsuario).then(result => {
      this.aulas = result;
      
      this.aulas.forEach(item => {
        item.DtAulaIni = new Date(item.DtAulaIni);
        item.DtAulaFormatada = (item.DtAulaIni.getDate()).toString() + "." + 
                              (item.DtAulaIni.getMonth() + 1) + " - " +
        item.DtAulaIni.getHours() + ":" + item.DtAulaIni.getMinutes()
      })
    });
  }

  ionViewDidEnter(){
    this.listarAulas();
  }

  cadastrarAula() {
    this.navCtrl.navigateRoot("aula");
  }

  editarAula(codAula) { 
      
    this.aulaService.codigoAula.next(codAula);
    this.navCtrl.navigateRoot("tabs/aula");
  }
}
