package br.edu.ifpb.acadon_spring.adapter.auth;

import br.edu.ifpb.acadon_spring.domain.exception.UsuarioNaoRegistradoException;
import br.edu.ifpb.acadon_spring.domain.model.FirebaseUsuario;
import br.edu.ifpb.acadon_spring.port.AutenticacaoServicePort;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.firebase.cloud.FirestoreClient;
import java.util.HashMap;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements AutenticacaoServicePort {

  @Override
  public void registrarUsuario(FirebaseUsuario firebaseUsuario)
      throws UsuarioNaoRegistradoException {
    try {
      var usuarioFirebase = FirebaseAuth.getInstance()
          .createUser(new CreateRequest().setEmail(firebaseUsuario.getEmail())
              .setPassword(firebaseUsuario.getSenha()));

      var firestoreDb = FirestoreClient.getFirestore();
      var userData = new HashMap<>();
      userData.put("papel", firebaseUsuario.getPapel());

      firestoreDb.collection("PAPEIS")
          .document(usuarioFirebase.getUid())
          .set(userData);
    } catch (FirebaseAuthException e) {
      throw new UsuarioNaoRegistradoException("Erro ao registrar usuário: " + e.getMessage());
    }
  }
}