import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { delay, map, Observable, filter, switchMap, of } from 'rxjs';
import Iuser from '../models/user.model';
import { Router } from '@angular/router';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<Iuser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  redirect = false;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore,
    public router: Router, public route: ActivatedRoute) {
    this.userCollection = db.collection('users');
    //this.auth.user.subscribe(console.log)

    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )

    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
      switchMap(route => route?.data ?? of({}))
    ).subscribe(data => {
      this.redirect = data.authOnly ?? false

    });

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

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }
    await this.auth.signOut();
    if (this.redirect) {
      await this.router.navigateByUrl('/');

    }

  }
}
