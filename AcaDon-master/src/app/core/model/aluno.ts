export class Aluno {
  constructor(
    public nome: string,
    public idade: number,
    public cpf: string,
    public email: string,
    public sexo: string,
    public id?: string
  ) {}
}
