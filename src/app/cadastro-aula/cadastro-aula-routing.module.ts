import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroAulaPage } from './cadastro-aula.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroAulaPageRoutingModule {}
