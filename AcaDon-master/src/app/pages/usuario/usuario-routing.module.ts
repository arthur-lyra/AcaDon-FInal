import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioRegistrarComponent } from './usuario-registrar/usuario-registrar.component';

const USUARIO_ROUTES: Routes = [
  { path: 'login', component: UsuarioLoginComponent },
  { path: 'register', component: UsuarioRegistrarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(USUARIO_ROUTES)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}