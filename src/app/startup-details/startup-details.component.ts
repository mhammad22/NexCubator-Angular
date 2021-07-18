import { StartupProject } from './../Models/StartupProject';
import { StartupTeam } from './../Models/StartupTeam';
import { StartupPitch } from './../Models/StartupPitch';
import { StartupDetailService } from './../services/startup-detail.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Startup } from '../Models/Startup';
import { SharedServiceService } from '../services/shared-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-startup-details',
  templateUrl: './startup-details.component.html',
  styleUrls: ['./startup-details.component.css'],
  providers: [SharedServiceService],
})
export class StartupDetailsComponent implements OnInit {
  constructor(
    private router?: Router,
    private _StartupDetailService?: StartupDetailService,
    private _sharedservice?: SharedServiceService,
    private toastr?: ToastrService
  ) {}

  //flag for role check admin or startup
  isUserRoleCheck = false;
  RoleName: string;

  //store the id of the startup clicked from previous page
  startupid: string;
  StartupDetail: any;
  StartupPitch: any;
  StartupTeam: any;
  StartupProject: any;
  JsonStringDetailStartup: any;
  TokenStartupDetailStartup: any;
  StartupDetailObj: Startup;
  StartupPitchObj: StartupPitch;
  StartupTeamSObj: StartupTeam;
  StartupTeamObj: StartupTeam[] = [];
  StartupProjectSObj: StartupProject;
  StartupProjectObj: StartupProject[] = [];

  DeleteTeamObj: StartupTeam;

  pitchExists: boolean = false;

  StartupProjectMember: string[] = [];

  MemberidSet: string;
  ProjectidSet: string;

  ngOnInit(): void {
    this.isUserRoleCheck = false;
    this.startupid = this.router.url.split('/')[3];
    console.log('On Return = ' + this.startupid);

    this._StartupDetailService.GetUserRole().subscribe((data) => {
      this.RoleName = data;
      console.log('Startup Detail Role Checking = ', this.RoleName);

      if (this.RoleName.localeCompare('Startup')) {
        this.isUserRoleCheck = true;
      }
      if (this.RoleName.localeCompare('Admin')) {
        this.isUserRoleCheck = false;
      }
    });

    this._StartupDetailService
      .StartupDetails(this.startupid)
      .subscribe((data) => {
        //console.log(data);
        this.JsonStringDetailStartup = JSON.stringify(data);
        this.TokenStartupDetailStartup = JSON.parse(
          this.JsonStringDetailStartup || []
        );
        this.StartupDetail = this.TokenStartupDetailStartup.startup;
        this.StartupPitch = this.StartupDetail.Pitch;
        this.StartupTeam = this.StartupDetail.StartupTeam;
        this.StartupProject = this.StartupDetail.StartupProject;
        // console.log(this.TokenStartupDetailStartup.startup);
        // this.StartupDetail=this.TokenStartupDetailStartup;

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

        console.log(this.StartupDetailObj);

        //fetch Details of the Pitch form
        this.StartupPitchObj = new StartupPitch(
          this.StartupPitch?.ProblemStatement,
          this.StartupPitch?.ProposedSolution,
          this.StartupPitch?.ValueProposition,
          this.StartupPitch?.MarketPlan,
          this.StartupPitch?.StartupId
        );

        //fetch details of the team
        if (this.StartupTeam) {
          for (var i = 0; i < this.StartupTeam.length; i++) {
            this.StartupTeamSObj = new StartupTeam(
              this.StartupTeam[i].MemberId,
              this.StartupTeam[i].Name,
              this.StartupTeam[i].Location,
              this.StartupTeam[i].Email,
              this.StartupTeam[i].Designation,
              this.StartupTeam[i].LinkedInProfile,
              this.StartupTeam[i].Image,
              this.StartupTeam[i].StartupID
            );
            console.log('Startup Team = ', this.StartupTeamSObj);
            this.StartupTeamObj.push(this.StartupTeamSObj);
          }
          this._sharedservice.AvailableTeam.next(this.StartupTeamObj);
          console.log(this._sharedservice.AvailableTeam);
          sessionStorage.setItem(
            'TeamList',
            JSON.stringify(this.StartupTeamObj)
          );
        }

        //fetch details of the project
        if (this.StartupProject.length != 0) {
          for (var i = 0; i < this.StartupProject.length; i++) {
            this.StartupProjectMember = [];
            if (this.StartupProject[i].ProjectPeople) {
              for (
                var j = 0;
                j < this.StartupProject[i].ProjectPeople.length;
                j++
              ) {
                console.log('Checking Project Team');
                console.log(this.StartupProject[i].ProjectPeople[j].MemberId);
                this.StartupProjectMember.push(
                  this.StartupProject[i].ProjectPeople[j].StartupTeam.Name
                );
              }
            }
            console.log('Showing list:');
            console.log(this.StartupProjectMember);
            this.StartupProjectSObj = new StartupProject(
              this.StartupProject[i].Title,
              this.StartupProject[i].Description,
              this.StartupProject[i].FundsRequired,
              this.StartupProject[i].StartupId,
              this.StartupProjectMember,
              this.StartupProject[i].ProjectId
            );
            this.StartupProjectObj.push(this.StartupProjectSObj);
          }
          console.log('Startup Project Details  = ', this.StartupProjectObj);
        }
      });

    this.GetTeamDetails();
  }

  GetTeamDetails() {
    console.log(this.StartupTeamObj);
    return this.StartupTeamObj;
  }

  onDeleteStartup() {
    this._StartupDetailService
      .DeleteStartup(this.startupid)
      .subscribe((data) => {
        this.toastr.show('Startup Deleted Successfully');
        this.router.navigateByUrl['/main-navabar'];
      });
  }

  onDelete(memberid, startupid) {
    this.MemberidSet = memberid;
  }

  onDeleteP(projectid) {
    this.ProjectidSet = projectid;
  }

  onDeleteTeamMember() {
    console.log('Member id = ', this.MemberidSet);

    if (this.StartupTeamObj) {
      for (var i = 0; i < this.StartupTeamObj.length; i++) {
        if (this.StartupTeamObj[i].MemberId == parseInt(this.MemberidSet)) {
          this.DeleteTeamObj = new StartupTeam(
            this.StartupTeam[i].MemberId,
            this.StartupTeam[i].Name,
            this.StartupTeam[i].Location,
            this.StartupTeam[i].Email,
            this.StartupTeam[i].Designation,
            this.StartupTeam[i].LinkedInProfile,
            this.StartupTeam[i].Image,
            this.StartupTeam[i].StartupID
          );
        }
      }
    }

    console.log('Deleted Team Member Details = ', this.DeleteTeamObj);

    this._StartupDetailService
      .DeleteMember(this.DeleteTeamObj.MemberId.toString(10))
      .subscribe(
        (data) => {
          this.toastr.show('Team Member Deleted Successfully');
        },
        (err) => {
          this.toastr.show('Team Member Deletion failed!');
        }
      );
  }

  onDeleteProject() {
    console.log('Project id = ', this.ProjectidSet);
    this._StartupDetailService.DeleteProject(this.ProjectidSet).subscribe(
      (data) => {
        this.toastr.show('Project Deleted Successfully');
      },
      (err) => {
        this.toastr.show('Project Deletion failed!');
      }
    );
  }

  onDeletePitch(id) {
    this._StartupDetailService.DeletePitch(id).subscribe(
      (data) => {
        this.toastr.show('Pitch Deleted Successfully');
      },
      (err) => {
        this.toastr.show('Pitch Deletion failed!');
      }
    );
  }
}
