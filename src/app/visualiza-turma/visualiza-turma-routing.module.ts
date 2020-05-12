import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VisualizaTurmaPage } from "./visualiza-turma.page";

const routes: Routes = [
  {
    path: "",
    component: VisualizaTurmaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizaTurmaPageRoutingModule {}
