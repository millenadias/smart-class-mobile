import { Component, OnInit } from '@angular/core';
import { TurmaService } from '../service/turma.service';
import { Turma } from '../model/turma';

@Component({
  selector: 'app-visualiza-turma',
  templateUrl: './visualiza-turma.page.html',
  styleUrls: ['./visualiza-turma.page.scss'],
})
export class VisualizaTurmaPage implements OnInit {

  turmas: Turma[] = [];
  constructor(private turmaService: TurmaService) { }

  ngOnInit() {
    this.turmaService.getTurmas().then(result=>{
      this.turmas = result;
  })
  }

}
