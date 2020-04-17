import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AulasPage } from './aulas.page';

const routes: Routes = [
  {
    path: '',
    component: AulasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulasPageRoutingModule {}
