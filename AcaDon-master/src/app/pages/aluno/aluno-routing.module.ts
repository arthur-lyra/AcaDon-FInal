import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { AlunoCadastrarComponent } from './aluno-cadastrar/aluno-cadastrar.component';
import { AlunoListarComponent } from './aluno-listar/aluno-listar.component';

const ALUNO_ROUTES: Routes = [
  {
    path: '',
    component: AlunoListarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro',
    component: AlunoCadastrarComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ALUNO_ROUTES)],
  exports: [RouterModule],
})
export class AlunoRoutingModule {}
