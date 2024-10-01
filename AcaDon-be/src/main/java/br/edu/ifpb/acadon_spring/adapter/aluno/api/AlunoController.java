package br.edu.ifpb.acadon_spring.adapter.aluno.api;

import br.edu.ifpb.acadon_spring.adapter.aluno.AlunoService;
import br.edu.ifpb.acadon_spring.adapter.aluno.api.dto.AlunoRequest;
import br.edu.ifpb.acadon_spring.domain.model.Aluno;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("alunos")
@CrossOrigin(value = "*")
public class AlunoController {

  private final AlunoService alunoService;

  public AlunoController(AlunoService alunoService) {
    this.alunoService = alunoService;
  }

  @GetMapping
  public ResponseEntity<List<Aluno>> listarAlunos() {
    return ResponseEntity.ok(alunoService.listarAlunos());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Aluno> buscarAluno(@PathVariable("id") Long id) {
    return ResponseEntity.ok(alunoService.buscarAluno(id));
  }

  @PostMapping
  public ResponseEntity<Aluno> salvarAluno(@Valid @RequestBody AlunoRequest treinadorRequest) {
    return ResponseEntity.ok(alunoService.salvarAluno(treinadorRequest));
  }

  @PutMapping("/{id}")
  public ResponseEntity<Aluno> editarAluno(@Valid @RequestBody AlunoRequest treinadorRequest) {
    return ResponseEntity.ok(alunoService.editarAluno(treinadorRequest));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletarAluno(@PathVariable("id") Long id) {
    alunoService.deletarAluno(id);
    return ResponseEntity.noContent()
        .build();
  }
}