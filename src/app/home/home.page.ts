import { Component } from '@angular/core';
import { AulaService } from '../service/aula.service';
import { Aula } from '../model/aula';
import { UsuarioService } from '../service/usuario.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  aulas: Aula[] = [];
  nomeUsuario: string = ""
  constructor(private aulaService: AulaService, private userService: UsuarioService, private navCtrl: NavController) {}

  ngOnInit() {

    if (this.userService.dadosUsuarioLogado.dsNome != undefined) {
      let nome = this.userService.dadosUsuarioLogado.dsNome.split(" ");
      this.nomeUsuario = nome[0];
    }

    this.listarAulas();
    
  }

  editarAula(codAula) {
    this.aulaService.codigoAula.next(codAula);
    this.navCtrl.navigateRoot("tabs/aula");
  }

  
  ionViewDidEnter(){
    this.listarAulas();
  }

  listarAulas() {
    this.aulaService.getAulasDiaProfessor(this.userService.dadosUsuarioLogado.cdUsuario).then(result => {
      this.aulas = result;
      
      this.aulas.forEach(item => {
        item.DtAulaIni = new Date(item.DtAulaIni);
        item.DtAulaFormatada = (item.DtAulaIni.getDate()).toString() + "." + 
                              (item.DtAulaIni.getMonth() + 1) + " - " +
        item.DtAulaIni.getHours() + ":" + item.DtAulaIni.getMinutes()
      })
    });
  }
}
