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
import { AlunoCadastrarComponent } from './aluno-cadastrar/aluno-cadastrar.component';
import { AlunoEditarComponent } from './aluno-editar/aluno-editar.component';
import { AlunoListarComponent } from './aluno-listar/aluno-listar.component';
import { AlunoRoutingModule } from './aluno-routing.module';

@NgModule({
  declarations: [
    AlunoListarComponent,
    AlunoCadastrarComponent,
    AlunoEditarComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    AlunoRoutingModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  exports: [
    AlunoListarComponent,
    AlunoCadastrarComponent,
    AlunoEditarComponent,
  ],
})
export class AlunoModule {}
