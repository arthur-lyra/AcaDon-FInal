import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Aluno } from '../../../core/model/aluno';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'aluno-editar',
  templateUrl: './aluno-editar.component.html',
  styleUrls: ['./aluno-editar.component.scss'],
})
export class AlunoEditarComponent {
  cliente: Aluno;

  constructor(
    public dialogRef: MatDialogRef<AlunoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Aluno },
    private clienteService: ClienteService
  ) {
    this.cliente = { ...data.cliente }; // Faz uma cópia do cliente para edição
  }

  onSave(): void {
    console.log(this.cliente);

    // Verificação da idade e do CPF
    if (!this.isIdadeValida(this.cliente.idade)) {
      console.error('Idade inválida. Deve ser maior ou igual a 14.');
      alert('Idade inválida. Deve ser maior ou igual a 14.');
      return; // Interrompe a execução se a idade for inválida
    }

    if (!this.ValidarCPF(this.cliente.cpf)) {
      console.error('CPF inválido.');
      alert('CPF inválido.');
      return; // Interrompe a execução se o CPF for inválido
    }

    if (this.cliente.cpf) {
      this.clienteService.atualizar(this.cliente).subscribe(
        (response) => {
          console.log('Cliente atualizado:', response);
          this.dialogRef.close(response); // Fecha o diálogo e passa o cliente atualizado de volta
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isIdadeValida(idade: number): boolean {
    // Verifica se o usuario possui a idade minima.
    return idade >= 14; // Ajuste conforme necessário
  }

  ValidarCPF(cpf: string): boolean {
    // Verifica o tamanho e se todos os números são iguais
    if (cpf.length !== 14 || /^(\d)\1+$/.test(cpf)) return false;

    return true;
  }

  formatCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length <= 14) {
      return cpf.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4'); // Aplica a Máscara.
    }
    return cpf;
  }

  capitalizeName(name: string): string {
    return name.replace(/\b\w/g, (char) => char.toUpperCase()); // Captaliza a primeira letra de cada nome para inserção no banco.
  }
}
