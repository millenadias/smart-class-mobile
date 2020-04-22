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
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((parametros) => {
      if (parametros["cdAula"]) {
        console.log("cdAula", parametros["cdAula"]);
        this.titulo = "Editar Aula";
        this.btnTitulo = "Editar";
      } else {
        this.titulo = "Cadastrar Aula";
        this.btnTitulo = "Cadastrar";
      }
    });
    this.disciplinaService.getDisciplinas().then((result) => {
      this.disciplinas = result;
    });

    this.salaService.getSalas().then((result) => {
      this.salas = result;
    });

    this.turmaService.getTurmas().then((result) => {
      this.turmas = result;
      console.log("result turma", result);
    });
    this.aula.CdProfessor = 3;
  }

  submit(value) {
    this.aula.CdAula = 0;
    this.aula.DsHorario = "";
    this.aula.DsProfessor = "";
    this.aula.DsSala = "";
    this.aula.DsDisciplina = "";
    this.aula.DsTurma = "";

    if (this.btnTitulo == "Editar") {
    } else {
      this.aulaService.cadastrarAula(this.aula);
    }

    console.log("this aula", this.aula);
  }
  onChange(value) {
    let detail = value["detail"];
    let valor = detail["value"];

    this.equipamentoService.getEquipamentos(valor).then((result) => {
      this.equipamentos = result;
    });
  }
}
