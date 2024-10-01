import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  CodeError(code: string){
    switch(code){
      //O email já existe
      case 'auth/email-already-in-use':
        return "O Usuario já existe."

      //A senha é fraca
      case 'auth/weak-password':
        return 'A senha é fraca.'

      //Email Inválido
      case 'auth/invalid-email':
        return 'Email invalido.'

      //Senha Incorreta
      case 'auth/wrong-password':
        return 'Senha Incorreta.'

      //Usuario não existe
      case 'auth/user-not-found':
        return 'Usuario não existe.'

      //Credencial invalida
      case 'auth/invalid-credential':
      return 'Credencial Invalida.'
      default:
        return 'Error desconhecido.'
    }
  }
}
