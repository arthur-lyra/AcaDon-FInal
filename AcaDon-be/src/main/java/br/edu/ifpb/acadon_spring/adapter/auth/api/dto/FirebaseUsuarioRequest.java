package br.edu.ifpb.acadon_spring.adapter.auth.api.dto;

import br.edu.ifpb.acadon_spring.domain.model.FirebaseUsuario;
import br.edu.ifpb.acadon_spring.domain.model.Papel;

public class FirebaseUsuarioRequest implements FirebaseUsuario {

  private String email;
  private String senha;
  private Papel papel;

  @Override
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  @Override
  public String getSenha() {
    return senha;
  }

  public void setSenha(String senha) {
    this.senha = senha;
  }

  @Override
  public Papel getPapel() {
    return papel;
  }

  public void setPapel(Papel papel) {
    this.papel = papel;
  }
}