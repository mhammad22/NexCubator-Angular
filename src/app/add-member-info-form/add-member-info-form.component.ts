import { Router } from '@angular/router';
import { StartupTeam } from './../Models/StartupTeam';
import { Component, OnInit } from '@angular/core';
import AddMemberService from '../services/add-member.service';
import { ToastrService } from 'ngx-toastr';
import { Startup } from '../Models/Startup';

@Component({
  selector: 'app-add-member-info-form',
  templateUrl: './add-member-info-form.component.html',
  styleUrls: ['./add-member-info-form.component.css'],
})
export class AddMemberInfoFormComponent implements OnInit {
  name: string;
  location: string;
  designation: string;
  email: string;
  linkedin: string;

  StartupTeamObj: StartupTeam;
  startupid: number;
  routeBuilt: string;

  JsonStringDetailStartup: any;
  TokenStartupDetailStartup: any;
  StartupTeamSObj: StartupTeam;
  sid: string;
  mid: string;

  StartupDetail: any;
  StartupTeam: any;
  EditMember = false;

  constructor(
    private _AddMemberService: AddMemberService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sid = this.router.url.split('/')[3];
    this.mid = this.router.url.split('/')[4];
    console.log('Startup ID = ', this.sid);

    if (this.router.url.split('/')[2] == 'edit-member') {
      this.EditMember = true;
    }

    this._AddMemberService.StartupDetails(this.sid).subscribe((data) => {
      this.JsonStringDetailStartup = JSON.stringify(data);
      this.TokenStartupDetailStartup = JSON.parse(
        this.JsonStringDetailStartup || []
      );
      this.StartupDetail = this.TokenStartupDetailStartup.startup;
      this.StartupTeam = this.StartupDetail.StartupTeam;

      if (this.StartupTeam) {
        for (var i = 0; i < this.StartupTeam.length; i++) {
          if (this.StartupTeam[i].MemberId == this.mid) {
            this.StartupTeamSObj = new StartupTeam(
              this.StartupTeam[i].MemberId,
              this.StartupTeam[i].Name,
              this.StartupTeam[i].Location,
              this.StartupTeam[i].Email,
              this.StartupTeam[i].Designation,
              this.StartupTeam[i].LinkedInProfile,
              this.StartupTeam[i].Image,
              parseInt(this.sid)
            );
          }
        }
      }

      //print team member info
      console.log('Team Member Info = ', this.StartupTeamSObj);

      //Assign values to form for Edit Member Information

      this.name = this.StartupTeamSObj.Name;
      this.location = this.StartupTeamSObj.Location;
      this.email = this.StartupTeamSObj.Email;
      this.designation = this.StartupTeamSObj.Designation;
      this.linkedin = this.StartupTeamSObj.LinkedInProfile;
    });
  }

  onClickSubmit() {
    if (!this.EditMember) {
      this.startupid = parseInt(this.router.url.split('/')[3]);
      this.StartupTeamObj = new StartupTeam(
        0,
        this.name,
        this.location,
        this.email,
        this.designation,
        this.linkedin,
        ' ',
        this.startupid
      );

      console.log(this.StartupTeamObj);

      this._AddMemberService
        .AddMember(this.StartupTeamObj)
        .subscribe((data) => {
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Team Member Added Successfully');
        });
    } else {
      this._AddMemberService
        .EditMember(this.StartupTeamSObj)
        .subscribe((data) => {
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Team Member Updated Successfully');
        });
    }
  }
}
