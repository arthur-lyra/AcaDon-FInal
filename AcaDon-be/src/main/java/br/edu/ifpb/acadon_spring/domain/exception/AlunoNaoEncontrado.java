package br.edu.ifpb.acadon_spring.domain.exception;

public class AlunoNaoEncontrado extends RuntimeException {

  public AlunoNaoEncontrado(String message) {
    super(message);
  }
}