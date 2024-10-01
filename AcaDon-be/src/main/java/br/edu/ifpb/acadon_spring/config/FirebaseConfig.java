package br.edu.ifpb.acadon_spring.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FirebaseConfig {

  @Value("${firebase.config.path}")
  private String firebaseConfigPath;

  @PostConstruct
  public void initialize() throws IOException {
    try (var serviceAccount = new FileInputStream(firebaseConfigPath)) {
      var options = FirebaseOptions.builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();
      FirebaseApp.initializeApp(options);
    }
  }
}