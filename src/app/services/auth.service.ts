import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import Iuser from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<Iuser>;
  public isAuthenticated$ : Observable<boolean>;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {
    this.userCollection = db.collection('users');
    //this.auth.user.subscribe(console.log)
    this.isAuthenticated$ =  auth.user.pipe(
      map(user => !!user)
    )
  }

  async createUser(userData: Iuser) {
    if (!userData.password) {
      throw new Error('password not provided');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    console.log(userCred);

    await this.userCollection.doc(userCred.user?.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber,
      password: userData.password
    })

    await userCred.user?.updateProfile({
      displayName: userData.name
    })

  }
}
