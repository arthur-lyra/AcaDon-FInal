import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirebaseErrorService } from '../../../core/services/firebase-error.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'usuario-registrar',
  templateUrl: './usuario-registrar.component.html',
  styleUrl: './usuario-registrar.component.scss',
})
export class UsuarioRegistrarComponent {
  registrarUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackbar: MatSnackBar,
    private router: Router,
    private firebaseError: FirebaseErrorService,
    private authService: AuthService
  ) {
    this.registrarUsuario = this.fb.group({
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required, Validators.minLength(6)],
      repetirSenha: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  registrar() {
    const email: string = this.registrarUsuario.value.email;
    const senha: string = this.registrarUsuario.value.senha;
    const repetirSenha: string = this.registrarUsuario.value.repetirSenha;

    if (senha !== repetirSenha) {
      this.snackbar.open('As senhas são diferentes', '', {
        duration: 3000,
      });;
      throw new Error();
    }
    
    const user = {
      email: email,
      senha: senha,
      papel: 'ADMIN'
  }

    this.authService.setUsuario(user).subscribe((user) => {
      this.snackbar.open('O Usuario Cadastrado com exito', '', {
        duration: 3000,
      });
      console.log(user)
      this.router.navigate(['/login']);
    },
    (error) => {
      this.snackbar.open(error.error.msg, '', {
        duration: 3000,
      });
    })

  }

  openSnackBar(error: any) {
    let msg = this.firebaseError.CodeError(error.code);
    this.snackbar.open(msg);
  }
}
