import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { FirebaseErrorService } from '../../../core/services/firebase-error.service';

@Component({
  selector: 'usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrl: './usuario-login.component.scss',
})
export class UsuarioLoginComponent implements OnInit {
  loginUsuario: FormGroup;
  private papelUsuarioSubject = new BehaviorSubject<string | null>(null);
  papelUsuario$ = this.papelUsuarioSubject.asObservable();

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router,
    private firebaseError: FirebaseErrorService,
    private readonly authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    const { email, senha } = this.loginUsuario.value;

    this.afAuth
      .signInWithEmailAndPassword(email, senha)
      .then((user) => {
        console.log(user); // Verifique se o usuário está sendo retornado
        const token = user.user?.uid || '';
        localStorage.setItem('token', token);
        this.authService.getUsuario();
        this.cdr.detectChanges();
        this.router.navigate(['/home']); // Verifique se redireciona
      })
      .catch((error) => {
        this.openSnackBar(error);
      });
  }

  openSnackBar(error: any) {
    let msg = this.firebaseError.CodeError(error.code);
    this.snackbar.open(msg);
  }
}
