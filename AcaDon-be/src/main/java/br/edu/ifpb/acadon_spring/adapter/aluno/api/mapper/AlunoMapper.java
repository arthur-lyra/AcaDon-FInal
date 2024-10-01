package br.edu.ifpb.acadon_spring.adapter.aluno.api.mapper;

import br.edu.ifpb.acadon_spring.adapter.aluno.AlunoEntity;
import br.edu.ifpb.acadon_spring.adapter.aluno.api.dto.AlunoResponse;
import br.edu.ifpb.acadon_spring.domain.model.Aluno;
import org.springframework.stereotype.Component;

@Component
public class AlunoMapper {

  public AlunoEntity toEntity(Aluno aluno) {
    var entidade = new AlunoEntity();
    entidade.setNome(aluno.getNome());
    entidade.setCpf(aluno.getCpf());
    entidade.setEmail(aluno.getEmail());
    entidade.setIdade(aluno.getIdade());
    entidade.setSexo(aluno.getSexo());
    return entidade;
  }

  public Aluno toResponse(AlunoEntity entidade) {
    var response = new AlunoResponse();
    response.setId(entidade.getId());
    response.setNome(entidade.getNome());
    response.setCpf(entidade.getCpf());
    response.setEmail(entidade.getEmail());
    response.setIdade(entidade.getIdade());
    response.setSexo(entidade.getSexo());
    return response;
  }
}