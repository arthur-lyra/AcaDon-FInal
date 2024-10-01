import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database'; // Import this module
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from './firebase.config';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(firebaseConfig), // Initialize Firebase here
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule, // Ensure this module is correctly imported
  ],
})
export class FirestoreModule {}
