import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisualizaTurmaPageRoutingModule } from './visualiza-turma-routing.module';

import { VisualizaTurmaPage } from './visualiza-turma.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisualizaTurmaPageRoutingModule
  ],
  declarations: [VisualizaTurmaPage]
})
export class VisualizaTurmaPageModule {}
