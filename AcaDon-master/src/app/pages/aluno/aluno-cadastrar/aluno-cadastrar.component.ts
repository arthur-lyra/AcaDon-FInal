import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'aluno-cadastrar',
  templateUrl: './aluno-cadastrar.component.html',
  styleUrls: ['./aluno-cadastrar.component.scss'],
})
export class AlunoCadastrarComponent {
  cliente = { nome: '', cpf: '', idade: 0, email: '', sexo: '' };

  constructor(
    private router: Router,
    private clientesService: ClienteService
  ) {}

  addCliente() {
    if (
      this.isIdadeValida(this.cliente.idade) &&
      this.ValidarCPF(this.cliente.cpf)
    ) {
      this.clientesService.setClientes(this.cliente).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/clientes']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Idade Inválida. Menor de Idade.');
      alert('idade Inválida. Menor de Idade.');
    }
  }

  isIdadeValida(idade: number): boolean {
    // Verifica se o usuario possui a idade minima.
    return idade >= 14; // Ajuste conforme necessário
  }

  ValidarCPF(cpf: string) {
    if (cpf.length !== 14 || /^(\d)\1+$/.test(cpf)) return false; // Verifica o tamanho e se todos os números são iguais.

    return true;
  }

  formatCPF(cpf: string): string {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos.
    if (cpf.length <= 14) {
      return cpf.replace(/(\d{3})(\d{3})?(\d{3})?(\d{2})?/, '$1.$2.$3-$4'); // Aplica a máscara.
    }
    return cpf;
  }

  capitalizeName(name: string): string {
    return name.replace(/\b\w/g, (char) => char.toUpperCase()); // Captaliza a primeira letra de cada nome para inserção no banco.
  }
}
