package br.edu.ifpb.acadon_spring.adapter.auth.api;

import br.edu.ifpb.acadon_spring.adapter.auth.AutenticacaoService;
import br.edu.ifpb.acadon_spring.adapter.auth.api.dto.FirebaseUsuarioRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@CrossOrigin(value = "*")
public class AutenticacaoController {

  private final AutenticacaoService autenticacaoService;

  public AutenticacaoController(AutenticacaoService autenticacaoService) {
    this.autenticacaoService = autenticacaoService;
  }

  @PostMapping("/registrar")
  public ResponseEntity<Void> registrarUsuario(
      @RequestBody FirebaseUsuarioRequest firebaseUsuario) {
    autenticacaoService.registrarUsuario(firebaseUsuario);
    return ResponseEntity.noContent()
        .build();
  }
}