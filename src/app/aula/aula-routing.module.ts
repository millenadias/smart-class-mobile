import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AulaPage } from './aula.page';

const routes: Routes = [
  {
    path: '',
    component: AulaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AulaPageRoutingModule {}
