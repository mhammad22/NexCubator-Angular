import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupRoleFormService } from './signup-role-form.service';

@Component({
  selector: 'app-signup-role-form',
  templateUrl: './signup-role-form.component.html',
  styleUrls: ['./signup-role-form.component.css'],
})
export class SignupRoleFormComponent implements OnInit {
  constructor(
    private SignUpRoleService: SignupRoleFormService,
    private router: Router
  ) {}

  userType: string;
  gender: string;
  type = [];

  getAccessToken() {
    if (location.hash) {
      if (location.hash.split('access_token=')) {
        var access_token = location.hash
          .split('access_token=')[1]
          .split('&')[0];
        if (access_token) {
          // var modifiedToken = 'access_token=' + access_token;
          console.log('Inside retrieved token');
          console.log(access_token);
          localStorage.setItem('TokenInfo', access_token);
        }
      }
    } else {
      console.log('No hash found.');
    }
  }

  ngOnInit(): void {
    this.type = [
      { id: 1, name: 'Investor' },
      { id: 2, name: 'Startup' },
    ];
    this.getAccessToken();

    this.SignUpRoleService.getExistingRole().subscribe((data) => {
      console.log("Returned Role: ", data);

      if (data == 'Startup') {
        localStorage.setItem('userrole', "Startup");
        this.router.navigate(['/main-navbar']);
      } else if (data == 'Investor') {
        localStorage.setItem('userrole', "Investor");
        this.router.navigate(['/investor-navbar']);
      }
    });
  }

  onClickSubmit(any) {
    console.log(this.userType);
    this.SignUpRoleService.setRole(this.userType).subscribe((data) => {
      console.log(data);
      localStorage.setItem('userrole', this.userType);
      if (this.userType == 'Startup') {
        this.router.navigate(['/main-navbar']);
      } else if (this.userType == 'Investor') {
        this.router.navigate(['/investor-navbar']);
      }
    });
  }
}
