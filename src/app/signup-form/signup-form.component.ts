import { RegisterBindingModel } from '../Models/RegisterBindingModel';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpService } from '../services/sign-up.service';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  FullName: string;
  emailAddress: string;
  Password: string;
  repeatPassword: string;
  userType: string;
  gender: string;
  type = [];
  Gender = [];
  UserData!: RegisterBindingModel;

  typeselected = null;

  constructor(private _SignUp_service: SignUpService, private router: Router) {}

  // signupExternalUser(accessToken) {
  //   $.ajax({
  //     url: 'https://localhost:44352/api/Account/RegisterExternal',
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: 'Bearer ' + accessToken,
  //     },
  //     success: function () {
  //       console.log('Inside signUpExternalUser');
  //       window.location.href =
  //         'https://localhost:44352/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fsignup-form&state=e21iTyITCFbSVczi_kXQKtCCLCLH8PTZGFCkD7xV4E41';

  //       // window.location.href="https://localhost:44352/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44352%2FLogin.html&state=e21iTyITCFbSVczi_kXQKtCCLCLH8PTZGFCkD7xV4E41";
  //     },
  //   });
  // }

  // isUserRegistered(accessToken) {
  //   $.ajax({
  //     url: 'https://localhost:44352/api/Account/UserInfo',
  //     method: 'GET',
  //     headers: {
  //       'content-type': 'application/JSON',
  //       Authorization: 'Bearer ' + accessToken,
  //     },
  //     success: (response) => {
  //       if (response.HasRegistered) {
  //         console.log('Inside HasRegistered:true');
  //         // localStorage.setItem('accessToken', accessToken);
  //         // localStorage.setItem('userName', response.Email);

  //         console.log(accessToken);
  //       } else {
  //         console.log('Inside HasRegistered:false');
  //         this.signupExternalUser(accessToken);
  //       }
  //     },
  //   });
  // }

  getAccessToken() {
    if (location.hash) {
      if (location.hash.split('access_token=')) {
        var access_token = location.hash
          .split('access_token=')[1]
          .split('&')[0];
        if (access_token) {
          console.log('Inside retrieved token');
          console.log(access_token);
          //this.isUserRegistered(access_token);
        }
      }
    } else {
      console.log('No hash found.');
    }
  }

  signOutTemporary(){
    this._SignUp_service.SignOut().subscribe((data)=>{

    })
  }

  ngOnInit(): void {
    console.log('Inside ready...');
    this.getAccessToken();
    this.type = [
      { id: 1, name: 'Investor' },
      { id: 2, name: 'Startup' },
    ];

    this.Gender = [
      { id: 1, name: 'Male' },
      { id: 2, name: 'Female' },
      { id: 3, name: 'Others' },
    ];

  }

  RegisterWithGoogle() {
    // window.location.href =
    //   'https://localhost:44352/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Fsignup-form&state=e21iTyITCFbSVczi_kXQKtCCLCLH8PTZGFCkD7xV4E41';

    window.location.href="https://localhost:44352/api/Account/ExternalLogin?provider=Google&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44352%2FLogin.html&state=e21iTyITCFbSVczi_kXQKtCCLCLH8PTZGFCkD7xV4E41";
  }

  RegisterWithFacebook(){
    window.location.href="https://localhost:44352/api/Account/ExternalLogin?provider=Facebook&response_type=token&client_id=self&redirect_uri=https%3A%2F%2Flocalhost%3A44352%2FLogin.html&state=e21iTyITCFbSVczi_kXQKtCCLCLH8PTZGFCkD7xV4E41";
  }

  onClickSubmit(values: any) {
    this.UserData = new RegisterBindingModel(
      this.emailAddress,
      this.FullName,
      this.userType,
      this.gender,
      this.Password,
      this.repeatPassword
    );
    this._SignUp_service.StoreUser(this.UserData).subscribe((data) => {});
  }
}
