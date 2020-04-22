import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TurmaPage } from "./turma.page";

const routes: Routes = [
  {
    path: "",
    component: TurmaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurmaPageRoutingModule {}
