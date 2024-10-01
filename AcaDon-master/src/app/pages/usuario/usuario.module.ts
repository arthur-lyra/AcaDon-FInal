import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioRegistrarComponent } from './usuario-registrar/usuario-registrar.component';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioLoginComponent, UsuarioRegistrarComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    UsuarioRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  exports: [UsuarioLoginComponent, UsuarioRegistrarComponent],
})
export class UsuarioModule {}
