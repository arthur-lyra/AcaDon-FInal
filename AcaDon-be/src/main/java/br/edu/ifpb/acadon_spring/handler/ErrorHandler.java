package br.edu.ifpb.acadon_spring.handler;

import br.edu.ifpb.acadon_spring.domain.exception.AlunoCpfCadastradoException;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoIdadeInvalidaException;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoNaoEncontrado;
import br.edu.ifpb.acadon_spring.domain.exception.UsuarioNaoRegistradoException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ErrorHandler {

  public static final HttpStatus BAD_REQUEST = HttpStatus.BAD_REQUEST;
  public static final HttpStatus UNAUTHORIZED = HttpStatus.UNAUTHORIZED;

  @ExceptionHandler(AlunoIdadeInvalidaException.class)
  public ResponseEntity<ApiErro> alunoIdadeInvalidaException(AlunoIdadeInvalidaException ex) {
    var erro = criarErro(ex);
    return new ResponseEntity<>(erro, BAD_REQUEST);
  }

  @ExceptionHandler(AlunoCpfCadastradoException.class)
  public ResponseEntity<ApiErro> alunoCpfCadastradoException(AlunoCpfCadastradoException ex) {
    var erro = criarErro(ex);
    return new ResponseEntity<>(erro, BAD_REQUEST);
  }

  @ExceptionHandler(AlunoNaoEncontrado.class)
  public ResponseEntity<ApiErro> alunoNaoEncontrado(AlunoNaoEncontrado ex) {
    var erro = criarErro(ex);
    return new ResponseEntity<>(erro, BAD_REQUEST);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<List<ApiErro>> methodArgumentNotValidException(
      MethodArgumentNotValidException ex) {
    var listaDeErros = ex.getBindingResult()
        .getFieldErrors()
        .stream()
        .map(e -> new ApiErro(BAD_REQUEST.value(), String.format("Campo: %s", e.getField()),
            e.getDefaultMessage()))
        .toList();
    return new ResponseEntity<>(listaDeErros, BAD_REQUEST);
  }

  @ExceptionHandler(UsuarioNaoRegistradoException.class)
  public ResponseEntity<ApiErro> usuarioNaoRegistradoException(UsuarioNaoRegistradoException ex) {
    var erro = criarErro(ex);
    return new ResponseEntity<>(erro, HttpStatus.BAD_REQUEST);
  }

  private ApiErro criarErro(Exception ex) {
    return new ApiErro(BAD_REQUEST.value(), ex.getMessage(), ex.getLocalizedMessage());
  }
}