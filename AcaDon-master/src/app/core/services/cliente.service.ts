import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../model/aluno';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/alunos';

  constructor(private httpClient: HttpClient) {}

  getClientes(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.apiUrl);
  }

  setClientes(cliente: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.apiUrl, cliente);
  }

  verificarCpfCadastrado(cpf: string): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(`${this.apiUrl}?cpf=${cpf}`);
  }

  verificarEmailCadastrado(email: string): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(`${this.apiUrl}?email=${email}`);
  }

  atualizar(cliente: Aluno): Observable<Aluno> {
    return this.httpClient.put<Aluno>(`${this.apiUrl}/${cliente.id}`, cliente);
  }

  remover(id: number): Observable<Aluno> {
    console.log(`Removendo cliente com ID: ${id}`);
    return this.httpClient.delete<Aluno>(`${this.apiUrl}/${id}`);
  }
}
