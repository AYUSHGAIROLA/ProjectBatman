import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user_credential } from 'src/assets/credentials/credentials'
import { errors } from './login.constant';
import { ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import { throttle } from 'lodash';
// import { throttle } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup = new FormGroup({});

  hide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const buttonContainerElement = this.elementRef.nativeElement.querySelector('.my-login-form-login-button');
    const loginButtonElement = this.elementRef.nativeElement.querySelector('.login-button');

    loginButtonElement.addEventListener("mouseover",
      throttle(() => {
        if (this.loginForm.invalid) {
          if (buttonContainerElement.classList.contains('login-form-invalid')) {
            buttonContainerElement.classList.replace('login-form-invalid', 'login-form-invalid-2')

          } else {
            buttonContainerElement.classList = ['my-login-form-login-button login-form-invalid']
          }
          this.getErrorTextMessage();
        }

      }, 300)
    )
  }

  // throttleLoginButtonHover = throttle(this.loginButtonHover.bind(this), 10)

  // loginButtonHover(){

  // }

  createLoginForm() {
    this.loginForm = this.fb.group(
      {
        username: [null, [Validators.required, this.usernameValidator.bind(this)]],
        password: [null, [Validators.required, this.passwordValidator.bind(this)]]
      }
    )
  }

  loginClickHandler() {
    if (this.loginForm.valid) {
      let userValidated: boolean = false;
      const username: string = this.loginForm.value.username;
      const password: string = this.loginForm.value.password;
      user_credential.users.forEach((oUser) => {
        if (oUser.username == username && oUser.password == password) {
          userValidated = true
          console.log("userLoggedIn");
          localStorage.setItem("isLoggedIn", "true");
          this.router.navigate(['app']);
        }
      })
      if (!userValidated) {
        this.getErrorTextMessage();
      }
    }
  }

  passwordValidator(control: AbstractControl) {
    if (control && control.value) {
      if (control.value.length < 5) {
        return { MIN_6_CHAR: true }
      }
      if (control.value.length > 10) {
        return { MAX_10_CHAR: true }
      }
      return null;
    } else {
      return { required: true }
    }

  }

  usernameValidator(control: AbstractControl) {
    if (control && control.value) {
      if (control.value.length < 5) {
        return { MIN_6_CHAR: true }
      }
      if (control.value.length > 10) {
        return { MAX_10_CHAR: true }
      }
      return null;
    } else {
      return { required: true }
    }

  }

  getErrorTextMessage(): string {

    if (this.loginForm && this.loginForm.invalid) {
      let errorMessage: string = "";
      for (const field in this.loginForm.controls) { // 'field' is a string

        const control: AbstractControl = this.loginForm.get(field);
        if (control && !control.valid && control.errors) {
          Object.keys(control.errors).forEach((oError: string) => {
            if (errors && errors[oError.toUpperCase()]) {
              if (errorMessage) {
                errorMessage += ' \n '
              }
              errorMessage += errors[oError.toUpperCase()];
            }


          });

        }

      }
      return errorMessage;


    }
    return '';
  }

}
