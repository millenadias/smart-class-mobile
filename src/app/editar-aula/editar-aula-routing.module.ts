import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarAulaPage } from './editar-aula.page';

const routes: Routes = [
  {
    path: '',
    component: EditarAulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarAulaPageRoutingModule {}
