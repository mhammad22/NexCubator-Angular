import { MainNavbarService } from './../services/main-navbar.service';
import { StartupDetailsOverviewComponent } from './../startup-details-overview/startup-details-overview.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/UserProfile';

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.css'],
})
export class MainNavbarComponent implements OnInit {
  constructor(private _router: Router,private _mainNavService:MainNavbarService) {}

  navbarOpen = false;

  navigateToSecond() {
    this._router.navigateByUrl('/setting');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
    }

  onLogout() {
    window.localStorage.removeItem('TokenInfo');
    window.localStorage.removeItem('LoggedInUserEmail')
    window.localStorage.removeItem('userrole');
    console.log("Logout Invoked");
    window.location.reload();
    this._router.navigate(['/login-form']);
    

  }

  ViewProfileObj !:UserProfile;
  NamePerson:any;
  ngOnInit(): void {
    this._mainNavService.ViewUserProfile().subscribe(
      data => {
        this.ViewProfileObj=data;
        this.NamePerson=this.ViewProfileObj.Name;
      }
    );
    
  }
}
