import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarAulaPageRoutingModule } from './editar-aula-routing.module';

import { EditarAulaPage } from './editar-aula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarAulaPageRoutingModule
  ],
  declarations: [EditarAulaPage]
})
export class EditarAulaPageModule {}
