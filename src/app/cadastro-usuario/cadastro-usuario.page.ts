import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.page.html',
  styleUrls: ['./cadastro-usuario.page.scss'],
})
export class CadastroUsuarioPage implements OnInit {

  usuario: Usuario = new Usuario();
  name: string;
  login: string;
  password: string;
  typeUser: number;

  constructor(private cadastroUsuarioService: UsuarioService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuario.cdTipoUsuario = 1;
  }

  submit(value)
  {
    this.usuario.cdUsuario = 0;
    this.usuario.cdTipoUsuario = this.typeUser;
    this.usuario.dsNome = this.name;
    this.usuario.dsLogin = this.login;
    this.usuario.dsSenha = this.password;

    this.cadastroUsuarioService.cadastrarUsuario(this.usuario);
  }
}
