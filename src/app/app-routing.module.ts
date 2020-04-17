import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro-aula',
    loadChildren: () => import('./cadastro-aula/cadastro-aula.module').then( m => m.CadastroAulaPageModule)
  },
  {
    path: 'editar-aula',
    loadChildren: () => import('./editar-aula/editar-aula.module').then( m => m.EditarAulaPageModule)
  },
  {
    path: 'aulas',
    loadChildren: () => import('./aulas/aulas.module').then( m => m.AulasPageModule)
  },
  {
    path: 'cadastro-usuario',
    loadChildren: () => import('./cadastro-usuario/cadastro-usuario.module').then( m => m.CadastroUsuarioPageModule)
  },
];

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
