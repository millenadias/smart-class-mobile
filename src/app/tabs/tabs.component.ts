import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {

  constructor(private navCtrl: NavController, private userService: UsuarioService) { }

  ngOnInit() {}

  sair() {
    this.userService.dadosUsuarioLogado = new Usuario();
    this.navCtrl.navigateRoot('login')
  }
}
