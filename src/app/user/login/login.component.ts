import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  }
  showAlert = false;
  alertMsg = 'We are logging you in! Please wait..';
  alertColor = 'blue';
  inSubmission = false;

  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  async login() {
    this.showAlert = true;
    this.alertMsg = 'We are logging you in! Please wait..';
    this.alertColor = 'blue';
    this.inSubmission = true;
    console.log(this.credentials);
    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);
    } catch (e) {
      this.alertMsg = 'Unexpected error occur..! Please try again';
      this.alertColor = 'red';
      this.inSubmission = false;
      console.log(e);
      return;
    }
    this.alertMsg = 'Success! You are logged in';
    this.alertColor = 'green';
  }

}
