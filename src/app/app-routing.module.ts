import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {

    path: "tabs",
    component: TabsComponent,
    children: [
      {
        path: "aula",
        loadChildren: () =>
          import("./aula/aula.module").then(
            (m) => m.AulaPageModule
          ),
      },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then(
            (m) => m.HomePageModule
          ),
      },
      {
        path: "aulas",
        loadChildren: () =>
          import("./aulas/aulas.module").then((m) => m.AulasPageModule),
      },
      {
        path: 'turma',
        loadChildren: () => import('./turma/turma.module').then(m => m.TurmaPageModule)
      },
      
      {
        path: 'visualiza-turma',
        loadChildren: () => import('./visualiza-turma/visualiza-turma.module').then(m => m.VisualizaTurmaPageModule)
      },
      { path: "", redirectTo: "tabs/home", pathMatch: "full" }
    ]
  },
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "cadastro-usuario",
    loadChildren: () =>
      import("./cadastro-usuario/cadastro-usuario.module").then(
        (m) => m.CadastroUsuarioPageModule
      ),
  }
  /*,
  {
    path: "login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "aula",
    loadChildren: () =>
      import("./aula/aula.module").then(
        (m) => m.AulaPageModule
      ),
  },
  {
    path: "aulas",
    loadChildren: () =>
      import("./aulas/aulas.module").then((m) => m.AulasPageModule),
  },
  {
    path: "cadastro-usuario",
    loadChildren: () =>
      import("./cadastro-usuario/cadastro-usuario.module").then(
        (m) => m.CadastroUsuarioPageModule
      ),
  },
  {
    path: 'turma',
    loadChildren: () => import('./turma/turma.module').then(m => m.TurmaPageModule)
  },*/

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
