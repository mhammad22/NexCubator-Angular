import { LoginFormService } from './login-form.service';
import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizedString } from '@angular/compiler';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  EmailAddress: string;
  Password: string;
  errMsg = [];
  isSuccessful = false;
  isSignUpFailed = false;

  isSuccessfulInvestor = false;
  isSignUpFailedInvestor = false;

  isSuccessfulAdmin = false;
  isSignUpFailedAdmin = false;

  Token: string;
  StoreUserRole: string;
  RoleToken: string;

  ngOnInit(): void {
    this.isSignUpFailed = false;
    this.isSuccessful = false;

    this.isSignUpFailedInvestor = false;
    this.isSuccessfulInvestor = false;

    this.isSuccessfulAdmin = false;
    this.isSignUpFailedAdmin = false;

    //get token from local storage.
    this.Token = this._Login_Service.returntoken();
    this.RoleToken = localStorage.getItem('userrole');
    if (this.Token != null && !this.RoleToken.localeCompare('Startup')) {
      this.router.navigate(['/main-navbar']);
    } else if (
      this.Token != null &&
      !this.RoleToken.localeCompare('Investor')
    ) {
      this.router.navigate(['/investor-navbar']);
    } else if (this.Token != null && !this.RoleToken.localeCompare('Admin')) {
      this.router.navigate(['/admin-navbar']);
    }
  }

  constructor(
    private _Login_Service: LoginFormService,
    private router: Router
  ) {}

  onClickSubmit(values: any) {
    this.EmailAddress = values.Email;
    this.Password = values.Password;
    // alert('Entered Email id : ' + this.EmailAddress);
    // alert('Entered Password :' +this.Password);

    //login API request
    this._Login_Service
      .GetLoginCredentials(this.EmailAddress, this.Password)
      .subscribe(
        (data) => {
          console.log(data);
          this._Login_Service.GetUserRole().subscribe((data1) => {
            this.StoreUserRole = data1;
            console.log('Store user Role = ', this.StoreUserRole);

            if (!this.StoreUserRole.localeCompare('Startup')) {
              this.isSuccessful = true;
              this.isSignUpFailed = false;
              this.router.navigate(['/main-navbar']);
              localStorage.removeItem('userrole');
              localStorage.setItem('userrole', 'Startup');
            } 
            else if (!this.StoreUserRole.localeCompare('Investor')) {
              this.isSuccessfulInvestor = true;
              this.isSignUpFailedInvestor = false;
              this.router.navigate(['/investor-navbar']);
              localStorage.removeItem('userrole');
              localStorage.setItem('userrole', 'Investor');
            }
            else if (!this.StoreUserRole.localeCompare('Admin')) {
              this.isSuccessfulAdmin = true;
              this.isSignUpFailedAdmin = false;
              this.router.navigate(['/admin-navbar']);
              localStorage.removeItem('userrole');
              localStorage.setItem('userrole', 'Admin');
            }
          });
        },
        (err) => {
          // this.errMsg = err.console.error.message;
          this.isSignUpFailed = true;
          this.isSignUpFailedInvestor = true;
        }
      );
  }
}
