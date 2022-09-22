import { Component } from '@angular/core';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  inSubmission = false;

  constructor(private auth: AuthService) {

  }
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
  age = new FormControl('', [
    Validators.required,
    Validators.min(18),
    Validators.max(120)


  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)

  ]);
  confirmPassword = new FormControl('', [
    Validators.required
  ]);
  phoneNumber = new FormControl('', [
    Validators.required,
    Validators.minLength(13),
    Validators.maxLength(13)
  ]);

  showAlert = false;
  alertColor = 'Please wait! Your account is being created..'
  alertMsg = 'blue'


  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    age: this.age,
    password: this.password,
    confirmPassword: this.confirmPassword,
    phoneNumber: this.phoneNumber
  })





  ngOnInit(): void {
  }

  async register() {
    //console.log('register method called..........')
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait! Your account is being created..';
    this.inSubmission = true;

    const { email, password } = this.registerForm.value;
    try {

      await this.auth.createUser(this.registerForm.value);

    } catch (e) {
      console.log(e);

      this.alertColor = 'red';
      this.alertMsg = 'Unexpected error occured. try again...';
      this.inSubmission = false;
      return
    }
    this.alertMsg = 'success';
    this.alertColor = 'green';
  }

}
