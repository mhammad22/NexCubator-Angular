import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../Models/UserProfile';
import { InvestorDashboardService } from './investor-dashboard.service';

@Component({
  selector: 'app-investor-dashboard',
  templateUrl: './investor-dashboard.component.html',
  styleUrls: ['./investor-dashboard.component.css']
})
export class InvestorDashboardComponent implements OnInit {

  ViewProfileObj !:UserProfile;
  NamePerson:any;

  constructor(private _router:Router,
              private service:InvestorDashboardService) { }

  ngOnInit(): void {
    this.service.ViewUserProfile().subscribe(data=>{
      this.ViewProfileObj=data;
      this.NamePerson=this.ViewProfileObj.Name;
    })
  }

  onLogout() {
    window.localStorage.removeItem('TokenInfo');
    window.localStorage.removeItem('userrole');
    console.log("Logout Invoked");
    window.location.reload();
    this._router.navigate(['/login-form']);
  }

}
