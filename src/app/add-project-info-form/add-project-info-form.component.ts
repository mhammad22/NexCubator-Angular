import { StartupTeam } from './../Models/StartupTeam';
import { StartupProject } from './../Models/StartupProject';
import { AddProjectService } from './../services/add-project.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StartupDetailsComponent } from '../startup-details/startup-details.component';
import { SharedServiceService } from '../services/shared-service.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-project-info-form',
  templateUrl: './add-project-info-form.component.html',
  styleUrls: ['./add-project-info-form.component.css'],
  providers: [SharedServiceService],
})
export class AddProjectInfoFormComponent implements OnInit {
  title: string;
  description: string;
  fundRequired: string;
  ProjectObj: StartupProject;

  startupid: number;
  routeBuilt: string;
  StartupTeamList: StartupTeam[];
  items = [];

  sid: string;
  mid: string;
  EditProject = false;

  JsonStringDetailStartup: any;
  TokenStartupDetailStartup: any;
  StartupDetail: any;
  StartupProjectSObj: StartupProject;
  StartupProject: any;
  StartupProjectObj: StartupProject[] = [];
  StartupProjectMember: string[] = [];

  projectMembers: string[] = [];
  selected = [
    // { id: 2, name: 'Node Js' },
    // { id: 8, name: 'ReactJs' },
  ];

  constructor(
    private _AddProjectService: AddProjectService,
    private router: Router,
    private toastr: ToastrService,
    private _sharedservice: SharedServiceService
  ) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('TeamList'));
    console.log(this.items);

    //If this page access to Edit Item
    this.sid = this.router.url.split('/')[3];
    this.mid = this.router.url.split('/')[4];

    if (this.router.url.split('/')[2] == 'edit-project') {
      this.EditProject = true;
    }

    ///Fetch the Project Details from the API
    this._AddProjectService.StartupDetails(this.sid).subscribe((data) => {
      this.JsonStringDetailStartup = JSON.stringify(data);
      this.TokenStartupDetailStartup = JSON.parse(
        this.JsonStringDetailStartup || []
      );
      this.StartupDetail = this.TokenStartupDetailStartup.startup;
      this.StartupProject = this.StartupDetail.StartupProject;

      //fetch details of the selected project passed from params(projectid)
      if (this.StartupProject.length != 0) {
        for (var i = 0; i < this.StartupProject.length; i++) {
          this.StartupProjectMember = [];

          if (this.StartupProject[i].ProjectId == this.mid) {
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
          }
        }
        console.log('Startup Project Details  = ', this.StartupProjectSObj);
      }

      this.title = this.StartupProjectSObj.Title;
      this.description = this.StartupProjectSObj.Description;
      this.fundRequired = this.StartupProjectSObj.FundsRequired;
      this.selected = this.StartupProjectSObj.member;
      this.items = this.StartupProjectSObj.member;
    });
  }

  onClickSubmit(values: any) {
    this.startupid = parseInt(this.router.url.split('/')[3]);
    this.ProjectObj = new StartupProject(
      this.title,
      this.description,
      this.fundRequired,
      this.startupid,
      []
    );
    // console.log("Startup id = "+this.startupidString);
    //this.projectMembers.push(this.startupid.toString());

    if (this.EditProject != true) {
      for (var i = 0; i < this.selected.length; i++) {
        this.projectMembers.push(this.selected[i].MemberId.toString());
        //this.projectMembers.concat('m',);
      }
      console.log('New string for API: ');
      console.log(this.projectMembers);

      this._AddProjectService.AddProject(this.ProjectObj).subscribe((data) => {
        // this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
        // this.router.navigate([this.routeBuilt]);

        if (this.selected.length > 0) {
          this._AddProjectService
            .AddProjectPeople(this.projectMembers)
            .subscribe(
              (data: any) => {
                this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
                this.router.navigate([this.routeBuilt]);
                this.toastr.show('Project Created Successfully');
              },
              (err) => {
                this.toastr.show('Project creation failed!');
              }
            );
        } else {
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Project Created Successfully');
        }
      });
    } else {
      this._AddProjectService.EditProject(this.ProjectObj).subscribe(
        (data) => {
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Project Updated Successfully');
        },
        (err) => {
          this.toastr.show('Project Updation failed!');
        }
      );
    }
  }

  // items = [
  //   {id: 1, name: 'Python'},
  //   {id: 2, name: 'Node Js'},
  //   {id: 3, name: 'Java'},
  //   {id: 4, name: 'PHP'},
  //   {id: 5, name: 'Django'},
  //   {id: 6, name: 'Angular'},
  //   {id: 7, name: 'Vue'},
  //   {id: 8, name: 'ReactJs'},
  // ];

  getValues(): void {
    console.log(this.selected);
  }

  ngOnDestroy(): void {
    sessionStorage.clear();
  }
}
