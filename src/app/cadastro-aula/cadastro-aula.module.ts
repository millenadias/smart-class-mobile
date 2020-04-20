import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroAulaPageRoutingModule } from './cadastro-aula-routing.module';

import { CadastroAulaPage } from './cadastro-aula.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroAulaPageRoutingModule
  ],
  declarations: [CadastroAulaPage]
})
export class CadastroAulaPageModule {}
