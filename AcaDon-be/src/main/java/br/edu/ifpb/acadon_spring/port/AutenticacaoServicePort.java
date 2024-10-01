package br.edu.ifpb.acadon_spring.port;

import br.edu.ifpb.acadon_spring.domain.exception.UsuarioNaoRegistradoException;
import br.edu.ifpb.acadon_spring.domain.model.FirebaseUsuario;

public interface AutenticacaoServicePort {

  void registrarUsuario(FirebaseUsuario firebaseUsuario) throws UsuarioNaoRegistradoException;
}