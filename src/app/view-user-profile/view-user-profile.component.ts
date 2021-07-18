import { UserProfile } from './../Models/UserProfile';
import { ViewUserProfileService } from './view-user-profile.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-user-profile',
  templateUrl: './view-user-profile.component.html',
  styleUrls: ['./view-user-profile.component.css'],
})
export class ViewUserProfileComponent implements OnInit {
  UserObj: UserProfile;
  UpdateUserObj: UserProfile;

  Name: string;
  Email: string;
  Phone: string;
  Nationality: string;
  Gender: string;
  id: number;

  constructor(
    private _ViewUserProfileService: ViewUserProfileService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._ViewUserProfileService.ViewUserProfile().subscribe((data) => {
      this.UserObj = data;
      console.log('data from view user profile =', this.UserObj);
    });
  }

  onClickEdit() {
    console.log('On Edit Clicked Called');
    this.Name = this.UserObj.Name;
    this.Email = this.UserObj.Email;
    this.Phone = this.UserObj.Phone;
    this.Nationality = this.UserObj.Nationality;
    this.Gender = this.UserObj.Gender;
    this.id = this.UserObj.UserId;
  }

  onClickSubmit() {
    this.UpdateUserObj = new UserProfile(
      this.id,
      this.Name,
      this.Gender,
      this.Nationality,
      this.Phone,
      this.Email,
      []
    );

    this._ViewUserProfileService.EditUserProfile(this.UpdateUserObj).subscribe(
      (data) => {
        this.toastr.show('Profile Updated Successfully !');
      },
      (err) => {
        this.toastr.show('Profile Updated Failed !');
      }
    );
  }
}
