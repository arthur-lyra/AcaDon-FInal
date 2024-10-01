import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuarioFirestoreService } from './usuario-firestore.service';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth/registrar';

  constructor(private usuarioFirestoreService: UsuarioFirestoreService, private httpClient: HttpClient) {}

  getUsuario(): Observable<any> {
    const uid = localStorage.getItem('token');
    if (uid) {
      return this.usuarioFirestoreService
        .getPapelUsuario(uid)
        .pipe(map((papel: any) => ({ uid: uid, papel })));
    }
    return new Observable();
  }

  setUsuario(user: User): Observable<User> {
    return this.httpClient.post<User>(this.apiUrl, user);
  }

}
