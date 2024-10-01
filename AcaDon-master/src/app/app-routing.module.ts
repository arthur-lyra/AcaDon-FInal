import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './pages/home/home.component';

console.log(AuthGuard);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () =>
      import('./pages/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'clientes',
    loadChildren: () =>
      import('./pages/aluno/aluno.module').then((m) => m.AlunoModule),
    data: { papel: 'ALUNO' },
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
