import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { DisciplinaService } from '../service/disciplina.service';
import { Sala } from '../model/sala';
import { SalaService } from '../service/sala.service';
import { Equipamento } from '../model/equipamento';
import { EquipamentoService } from '../service/equipamento.service';
import { Aula } from '../model/aula';
import { UsuarioService } from '../service/usuario.service';
import { AulaService } from '../service/aula.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aula',
  templateUrl: './aula.page.html',
  styleUrls: ['./aula.page.scss'],
})
export class AulaPage implements OnInit {

  disciplinas: Disciplina[] = []
  salas: Sala[] = []
  equipamentos: Equipamento[] = []
  aula: Aula = new Aula();

  titulo: String = '';
  btnTitulo: String =  '';

  codigoDisc: number;
  constructor(private disciplinaService: DisciplinaService, 
    private salaService: SalaService, 
    private equipamentoService: EquipamentoService,
    private usuarioService: UsuarioService, 
    private aulaService: AulaService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe( parametros => {
      if (parametros['cdAula']) {
        console.log('cdAula', parametros['cdAula']);
        this.titulo = 'Editar Aula';
        this.btnTitulo = 'Editar';
      } else {
        this.titulo = 'Cadastrar Aula';
        this.btnTitulo = 'Cadastrar';
      }
    });
    this.disciplinaService.getDisciplinas().then(result => {
      this.disciplinas = result;      
    });

    this.salaService.getSalas().then(result => {
      this.salas = result;
    });

  }
 
  submit(value) {
    
    this.aula = value;
    this.aula.cdProfessor = this.usuarioService.dadosUsuarioLogado.cdUsuario;
    
    if (this.btnTitulo == 'Editar') {

    } else {
      this.aulaService.cadastrarAula(this.aula);
    }

   
    console.log('this aula', this.aula);
    
  }
  onChange(value) {
    let detail = value['detail']
    let valor = detail['value']
    
    this.equipamentoService.getEquipamentos(valor).then(result => {
      this.equipamentos = result;            
    });
  }
}
