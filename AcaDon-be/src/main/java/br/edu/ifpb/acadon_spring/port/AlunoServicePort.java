package br.edu.ifpb.acadon_spring.port;

import br.edu.ifpb.acadon_spring.domain.exception.AlunoCpfCadastradoException;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoIdadeInvalidaException;
import br.edu.ifpb.acadon_spring.domain.model.Aluno;
import java.util.List;

public interface AlunoServicePort {

  Aluno salvarAluno(Aluno aluno) throws AlunoIdadeInvalidaException, AlunoCpfCadastradoException;

  void deletarAluno(Long id);

  List<Aluno> listarAlunos();

  Aluno buscarAluno(Long id);

  Aluno editarAluno(Aluno aluno) throws AlunoIdadeInvalidaException, AlunoCpfCadastradoException;
}