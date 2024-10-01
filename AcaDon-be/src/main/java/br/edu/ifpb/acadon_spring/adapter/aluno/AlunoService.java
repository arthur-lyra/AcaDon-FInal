package br.edu.ifpb.acadon_spring.adapter.aluno;

import br.edu.ifpb.acadon_spring.adapter.aluno.api.mapper.AlunoMapper;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoCpfCadastradoException;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoIdadeInvalidaException;
import br.edu.ifpb.acadon_spring.domain.exception.AlunoNaoEncontrado;
import br.edu.ifpb.acadon_spring.domain.model.Aluno;
import br.edu.ifpb.acadon_spring.port.AlunoServicePort;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class AlunoService implements AlunoServicePort {

  private static final String EMAIL_CADASTRADO_MSG = "Email para cliente já cadastrado";
  private static final String CPF_CADASTRADO_MSG = "CPF para cliente já cadastrado";

  private final AlunoRepository alunoRepository;
  private final AlunoMapper alunoMapper;

  public AlunoService(AlunoRepository alunoRepository, AlunoMapper alunoMapper) {
    this.alunoRepository = alunoRepository;
    this.alunoMapper = alunoMapper;
  }

  @Override
  public Aluno salvarAluno(Aluno aluno)
      throws AlunoIdadeInvalidaException, AlunoCpfCadastradoException {
    validarAluno(aluno);
    var registro = alunoRepository.save(alunoMapper.toEntity(aluno));
    return alunoMapper.toResponse(registro);
  }

  @Override
  public Aluno editarAluno(Aluno aluno)
      throws AlunoIdadeInvalidaException, AlunoCpfCadastradoException {
    validarAluno(aluno);
    var alunoDb = buscarAlunoDb(aluno.getId());
    atualizarAlunoEntity(alunoDb, aluno);
    return alunoMapper.toResponse(alunoRepository.save(alunoDb));
  }

  @Override
  public List<Aluno> listarAlunos() {
    return alunoRepository.findAll()
        .stream()
        .map(alunoMapper::toResponse)
        .toList();
  }

  @Override
  public Aluno buscarAluno(Long id) {
    return alunoMapper.toResponse(buscarAlunoDb(id));
  }

  @Override
  public void deletarAluno(Long id) {
    var alunoDb = buscarAlunoDb(id);
    alunoRepository.delete(alunoDb);
  }

  private AlunoEntity buscarAlunoDb(Long id) {
    return alunoRepository.findById(id)
        .orElseThrow(() -> new AlunoNaoEncontrado("Aluno nao encontrado"));
  }

  private void validarAluno(Aluno aluno) throws AlunoCpfCadastradoException {
    verificarEmailExistente(aluno.getEmail(), aluno.getId());
    verificarCpfExistente(aluno.getCpf(), aluno.getId());
    validarIdade(aluno.getIdade());
  }

  private void verificarEmailExistente(String email, Long usuarioId) throws AlunoCpfCadastradoException {
    alunoRepository.findByEmail(email)
            .ifPresent(cliente -> {
              if (!cliente.getId().equals(usuarioId)) {
                throw new AlunoCpfCadastradoException(EMAIL_CADASTRADO_MSG);
              }
            });
  }

  private void verificarCpfExistente(String cpf,  Long usuarioId) throws AlunoCpfCadastradoException {
    alunoRepository.findByCpf(cpf)
        .ifPresent(cliente -> {
          if (!cliente.getId().equals(usuarioId)) {
            throw new AlunoCpfCadastradoException(CPF_CADASTRADO_MSG);
          }
        });
  }

  public void validarIdade(Integer idade) {
    if (idade < 14) {
      throw new AlunoIdadeInvalidaException("Cliente menor de idade não permitido");
    }
  }

  private void atualizarAlunoEntity(AlunoEntity alunoDb, Aluno aluno) {
    alunoDb.setNome(aluno.getNome());
    alunoDb.setCpf(aluno.getCpf());
    alunoDb.setEmail(aluno.getEmail());
    alunoDb.setIdade(aluno.getIdade());
    alunoDb.setSexo(aluno.getSexo());
  }
}