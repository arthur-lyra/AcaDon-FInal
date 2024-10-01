import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioFirestoreService {
  constructor(private readonly afs: AngularFirestore) {}

  getPapelUsuario = (uid: string): Observable<string> => {
    return this.afs
      .collection('PAPEIS')
      .doc(uid)
      .valueChanges()
      .pipe(map((data: any) => data?.papel));
  };
}
