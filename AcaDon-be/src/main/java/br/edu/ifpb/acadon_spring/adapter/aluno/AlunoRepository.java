package br.edu.ifpb.acadon_spring.adapter.aluno;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlunoRepository extends JpaRepository<AlunoEntity, Long> {

  Optional<AlunoEntity> findByEmail(String email);

  Optional<AlunoEntity> findByCpf(String cpf);
}