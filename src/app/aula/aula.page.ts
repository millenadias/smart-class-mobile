import { Component, OnInit } from "@angular/core";
import { Disciplina } from "../model/disciplina";
import { DisciplinaService } from "../service/disciplina.service";
import { Sala } from "../model/sala";
import { SalaService } from "../service/sala.service";
import { Equipamento } from "../model/equipamento";
import { EquipamentoService } from "../service/equipamento.service";
import { Aula } from "../model/aula";
import { UsuarioService } from "../service/usuario.service";
import { AulaService } from "../service/aula.service";
import { ActivatedRoute } from "@angular/router";
import { Turma } from "../model/turma";
import { TurmaService } from "../service/turma.service";

@Component({
  selector: "app-aula",
  templateUrl: "./aula.page.html",
  styleUrls: ["./aula.page.scss"],
})
export class AulaPage implements OnInit {
  disciplinas: Disciplina[] = [];
  salas: Sala[] = [];
  equipamentos: Equipamento[] = [];
  turmas: Turma[] = [];
  aula: Aula = new Aula();

  titulo: String = "";
  btnTitulo: String = "";
  codigoDisc: number;
  constructor(
    private disciplinaService: DisciplinaService,
    private salaService: SalaService,
    private equipamentoService: EquipamentoService,
    private usuarioService: UsuarioService,
    private aulaService: AulaService,
    private route: ActivatedRoute,
    private turmaService: TurmaService
  ) { }

  ngOnInit() {

    this.disciplinaService.getDisciplinas().then((result) => {
      this.disciplinas = result;
    });

    this.salaService.getSalas().then((result) => {
      this.salas = result;
    });

    this.turmaService.getTurmas().then((result) => {
      this.turmas = result;
    });

    this.aula.CdProfessor = this.usuarioService.dadosUsuarioLogado.cdUsuario;

    this.route.queryParams.subscribe((parametros) => {
      if (parametros["cdAula"]) {
        this.titulo = "Editar Aula";
        this.btnTitulo = "Editar";
        this.aulaService.getAula(parametros["cdAula"]).then(data => {
          if (data != undefined) {
            this.aula = data;

            this.equipamentoService.getEquipamentos(this.aula.CdSala).then((result) => {
              this.equipamentos = result;
            });

            this.aulaService.carregarPreferencias(this.aula.CdAula).then((data: Array<number>) => {
              this.carregarPreferencias(data);
            })
          }
  
        })
      } else {
        this.titulo = "Cadastrar Aula";
        this.btnTitulo = "Cadastrar";
      }
    });
    
  }

  carregarPreferencias(preferencias: Array<number>) {
    preferencias.forEach(item => {
      this.equipamentos.filter(x => x.CdEquipamento == item).forEach(equip => {
        equip.marcado = true;
      });
    })
  }

  ionViewDidLeave() {
    this.aula = new Aula();
    this.equipamentos = [];
  }

  submit(value) {
    if (this.validarCampos() == true) {
      this.aulaService.validarAulaPermitida(this.aula.CdSala, this.aula.DtAulaIni, this.aula.DtAulaFim).then(data => {
        if (data == true) {
          this.aula.CdProfessor = this.usuarioService.dadosUsuarioLogado.cdUsuario;
          let equipamentosMarcados: Array<number> = [];
          this.equipamentos.forEach(item => {
            if (item.marcado)
              equipamentosMarcados.push(item.CdEquipamento);
          });

          if (this.aula.CdAula != undefined && this.aula.CdAula > 0) {
            this.aulaService.alterarAula(this.aula, equipamentosMarcados);
          } else {
            this.aulaService.cadastrarAula(this.aula, equipamentosMarcados);
          }
        } else {
          this.aulaService.alertValidacao("Sala indisponível para o horário informado");
        }
      });
    }
  }

  onChange(value) {
    let detail = value["detail"];
    let valor = detail["value"];

    this.equipamentoService.getEquipamentos(valor).then((result) => {
      this.equipamentos = result;
    });
  }

  validarCampos(): boolean {
    
    if (this.aula.CdDisciplina == undefined) {      
      this.aulaService.alertValidacao("Selecione a disciplina.");
      return false;
    }

    if (this.aula.CdTurma == undefined) {
      this.aulaService.alertValidacao("Selecione a turma.")
      return false;
    }

    if (this.aula.DtAulaIni == undefined) {
      this.aulaService.alertValidacao("Informe a data e horário de início.")
      return false;
    }

    if (this.aula.DtAulaFim == undefined) {
      this.aulaService.alertValidacao("Informe a data e horário de final.")
      return false;
    }

    if (this.aula.DtAulaFim < this.aula.DtAulaIni) {
      this.aulaService.alertValidacao("A data e horário final deve ser maior que a data e horário inicial")
      return false;
    }

    if (this.aula.CdSala == undefined) {
      this.aulaService.alertValidacao("Selecione a Sala.")
      return false;
    }
    return true;
  }
}
