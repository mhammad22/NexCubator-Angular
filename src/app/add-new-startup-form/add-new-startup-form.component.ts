import { Router } from '@angular/router';
import { AddStartupService } from './../services/add-startup.service';
import { Component, OnInit } from '@angular/core';
import { Startup } from '../Models/Startup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-startup-form',
  templateUrl: './add-new-startup-form.component.html',
  styleUrls: ['./add-new-startup-form.component.css'],
})
export class AddNewStartupFormComponent implements OnInit {
  constructor(
    private _AddStartup: AddStartupService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  name: string;
  location: string;
  email: string;
  technology: string;
  description: string;
  funding: number;
  dateFounded: Date;
  logo: string;

  StartupObj: Startup;
  routeBuilt: string;
  StartupDetail: any;
  StartupDetailObj: Startup;

  JsonStringDetailStartup: any;
  TokenStartupDetailStartup: any;
  files: any;

  startupid: string;
  StartupEdit: string;
  EditFormCheck = false;

  ngOnInit(): void {
    this.startupid = this.router.url.split('/')[3];
    this.StartupEdit = this.router.url.split('/')[2];

    //if Startup edit access this form
    if (this.StartupEdit == 'edit-startup') {
      this.EditFormCheck = true;
      this._AddStartup.StartupDetails(this.startupid).subscribe((data) => {
        this.JsonStringDetailStartup = JSON.stringify(data);
        this.TokenStartupDetailStartup = JSON.parse(
          this.JsonStringDetailStartup || []
        );

        this.StartupDetail = this.TokenStartupDetailStartup.startup;
        //fetch detail of startup
        this.StartupDetailObj = new Startup(
          this.StartupDetail.StartupId,
          this.StartupDetail.Name,
          this.StartupDetail.Location,
          this.StartupDetail.Email,
          this.StartupDetail.Technology,
          this.StartupDetail.Description,
          this.StartupDetail.Funding,
          this.StartupDetail.DateFounded,
          this.StartupDetail.UserId,
          this.StartupDetail.StartupLogo
        );

        this.name = this.StartupDetailObj.Name;
        this.location = this.StartupDetailObj.Location;
        this.email = this.StartupDetailObj.Email;
        this.technology = this.StartupDetailObj.Technology;
        this.description = this.StartupDetailObj.Description;
        this.funding = this.StartupDetailObj.Funding;
        this.dateFounded = this.StartupDetailObj.DateFounded;
        this.logo = this.StartupDetailObj.StartupLogo;
      });
    }
  }

  onChange(event: any) {
    this.files = event.srcElement.files[0];
    console.log(this.files);
  }

  onClickSubmit() {
    let CLOUDINARY_URL =
      'https://api.cloudinary.com/v1_1/nexcubator/image/upload';
    let CLOUDINARY_UPLOAD_PRESET = 'startuplogo';

    const formData = new FormData();
    formData.append('file', this.files);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    let returnUrl = null;

    fetch(CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url !== '') {
          // const uploadedFileUrl = data.secure_url;
          returnUrl = data.secure_url;
          console.log(returnUrl);

          this.StartupObj = new Startup(
            0,
            this.name,
            this.location,
            this.email,
            this.technology,
            this.description,
            this.funding,
            this.dateFounded,
            0,
            returnUrl
          );

          if (this.EditFormCheck != true) {
            this._AddStartup.postStartup(this.StartupObj).subscribe((data) => {
              //this.routeBuilt = 'main-navbar/explore-startups';
              //this.router.navigate([this.routeBuilt]);
              this.toastr.show('Startup Added Successfully');
            });
          } else {
            this._AddStartup
              .UpdateStartup(this.StartupObj)
              .subscribe((data) => {
                this.toastr.show('Startup Updated Successfully');
              });
          }
        }
      })
      .catch((err) => console.error(err));
  }
}
