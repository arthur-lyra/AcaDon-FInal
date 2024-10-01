package br.edu.ifpb.acadon_spring.domain.exception;

public class UsuarioNaoRegistradoException extends RuntimeException {

  public UsuarioNaoRegistradoException(String message) {
    super(message);
  }
}