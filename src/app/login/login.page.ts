import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Usuario } from '../model/usuario';
import { NavController } from '@ionic/angular';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginErrado: boolean = false;

  usuario: Usuario = new Usuario();
  constructor(private loginService: LoginService, private navCtrl: NavController) {
    
   }

  ngOnInit() {
   
  }

  onSubmit(){    
    this.loginService.getDadosUsuario(this.usuario.dsLogin, this.usuario.dsSenha).then((result: Usuario) => {
      
      if (result.cdUsuario && result.cdUsuario > 0)
        this.navCtrl.navigateRoot('aulas');
      else
        this.loginErrado = true;
    })
  }
}
