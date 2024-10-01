package br.edu.ifpb.acadon_spring.adapter.aluno.api.dto;

import br.edu.ifpb.acadon_spring.domain.model.Aluno;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

public class AlunoRequest implements Aluno {

  private Long id;
  @NotBlank
  private String nome;
  @CPF
  private String cpf;
  @Email
  private String email;
  @NotNull
  private Integer idade;
  @NotBlank
  private String sexo;

  @Override
  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  @Override
  public @NotBlank String getNome() {
    return nome;
  }

  public void setNome(@NotBlank String nome) {
    this.nome = nome;
  }

  @Override
  public @CPF String getCpf() {
    return cpf;
  }

  public void setCpf(@CPF String cpf) {
    this.cpf = cpf;
  }

  @Override
  public @Email String getEmail() {
    return email;
  }

  public void setEmail(@Email String email) {
    this.email = email;
  }

  @Override
  public @NotNull Integer getIdade() {
    return idade;
  }

  public void setIdade(@NotNull Integer idade) {
    this.idade = idade;
  }

  @Override
  public @NotBlank String getSexo() {
    return sexo;
  }

  public void setSexo(@NotBlank String sexo) {
    this.sexo = sexo;
  }
}