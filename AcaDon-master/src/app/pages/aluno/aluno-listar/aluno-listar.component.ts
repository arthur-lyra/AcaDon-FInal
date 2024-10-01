import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Aluno } from '../../../core/model/aluno';
import { ClienteService } from '../../../core/services/cliente.service';
import { AlunoEditarComponent } from '../aluno-editar/aluno-editar.component';

@Component({
  selector: 'aluno-listar',
  templateUrl: './aluno-listar.component.html',
  styleUrl: './aluno-listar.component.scss',
})
export class AlunoListarComponent implements OnInit {
  displayedColumns: string[] = [
    'nome',
    'idade',
    'cpf',
    'email',
    'sexo',
    'actions',
  ];
  dataSource: any[] = [];

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe((data) => {
      console.log('Dados recebidos:', data);
      this.dataSource = data;
    });
  }
  editarCliente(cliente: Aluno): void {
    const dialogRef = this.dialog.open(AlunoEditarComponent, {
      width: '700px',
      data: { cliente },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.dataSource.findIndex((c) => c.id === result.id);
        if (index !== -1) {
          this.dataSource[index] = result;
          this.dataSource = [...this.dataSource]; // Para garantir que o DataTable é atualizado
        }
      }
    });
  }

  removerCliente(id: number): void {
    if (confirm('Tem certeza que deseja remover este cliente?')) {
      this.clienteService.remover(id).subscribe(
        () => {
          console.log('Cliente removido com sucesso!');
          // Atualize a lista de clientes após a remoção
          this.dataSource = this.dataSource.filter(
            (cliente) => cliente.id !== id
          );
          this.router.navigate(['clientes']);
        },
        (error) => {
          console.error('Erro ao remover cliente:', error);
        }
      );
    }
  }
}
