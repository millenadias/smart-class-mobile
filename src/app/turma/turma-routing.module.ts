import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TurmaPage } from "./turma.page";

const routes: Routes = [
  {
    path: "",
    component: TurmaPage,
  },

  {
    path: "home",
    loadChildren: () =>
      import("../home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "aulas",
    loadChildren: () =>
      import("../aulas/aulas.module").then((m) => m.AulasPageModule),
  },
  {
    path: "aula",
    loadChildren: () =>
      import("../aula/aula.module").then((m) => m.AulaPageModule),
  },
  {
    path: "turma",
    loadChildren: () =>
      import("../turma/turma.module").then((m) => m.TurmaPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TurmaPageRoutingModule {}
