import { AdminDashboardService } from './admin-dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/UserProfile';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  NamePerson: any;
  ViewProfileObj !:UserProfile;

  constructor(
    private _router: Router,
    private service: AdminDashboardService
  ) {}

  ngOnInit(): void {
    this.service.ViewUserProfile().subscribe((data) => {
      this.ViewProfileObj = data;
      this.NamePerson = this.ViewProfileObj.Name;
      console.log("Name Person = ",this.NamePerson);
    });
  }

  onLogout() {
    window.localStorage.removeItem('TokenInfo');
    window.localStorage.removeItem('userrole');
    console.log('Logout Invoked');
    window.location.reload();
    this._router.navigate(['/login-form']);
  }
}
