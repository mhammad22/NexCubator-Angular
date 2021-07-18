import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProjectTask } from '../Models/ProjectTask';
import { Startup } from '../Models/Startup';
import { StartupProject } from '../Models/StartupProject';
import { ExploreStartupService } from '../services/explore-startup.service';
import { ProjectManagementService } from './project-management.service';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  TaskId: number;
  TaskName: string;
  TaskStatus: string;
  TaskDescription: string;
  TaskStartDate: string;
  TaskEndDate: string;
  TaskObj: ProjectTask;
  EditTaskObj: ProjectTask;

  ProjectId: number;

  StartupProjects: StartupProject[] = [];
  selectedProject: string;
  selectedProjectId: number;

  selectedStartup: string;
  StartupObj: Startup;
  StartupsList: Startup[] = [];

  EditTaskid: number;
  EditTaskFlag = false;

  items = [];
  selected = [
    // { id: 2, name: 'Node Js' },
    // { id: 8, name: 'ReactJs' },
  ];
  taskMembers: string[] = [];

  JsonStringTaskProject: any;
  TokenStartupTaskProject: any;

  objTask: ProjectTask;
  TaskList: ProjectTask[] = [];

  ToDo: ProjectTask[] = [];
  InProgress: ProjectTask[] = [];
  Done: ProjectTask[] = [];

  addCardBool: boolean = false;

  ModalTask: ProjectTask;
  ModalFlag: boolean;

  getValues(): void {
    console.log(this.selected);
  }

  constructor(
    private _exploreService: ExploreStartupService,
    private _project: ProjectManagementService,
    private toastr: ToastrService
  ) {}

  getSelectedStartup(): void {
    // this.selectedStartup.Name.replace(" ","_")
    let t = this.selectedStartup;
    console.log(t);

    let id = 0;

    //Find startup id by startup name
    this.StartupsList.forEach((element) => {
      if (element.Name == t) {
        console.log(element.StartupId);
        id = element.StartupId;
      }
    });

    //Get team members for selected startup
    this._project.getTeamMembers(id).subscribe((data) => {
      console.log(data);
      this.items = data;
    });

    // console.log(localStorage.getItem('TokenInfo'));
    // let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');

    let tokenInfo = localStorage.getItem('TokenInfo');

    jQuery.ajax({
      url: 'http://localhost:52497/api/Startup/GetProjectsForStartup/' + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenInfo,
      },
      success: (result) => {
        if (result.isOk == false) alert(result.message);
        this.StartupProjects = [];
        result.forEach((element) => {
          // console.log(element);

          this.StartupProjects.push(element);
          console.log(this.StartupProjects);
        });
      },
      async: true,
    });
  }

  getSelectedProject(): void {
    console.log(this.selectedProject);

    this.ToDo = [];
    this.InProgress = [];
    this.Done = [];

    let id = 0;

    //Find project id by project name
    this.StartupProjects.forEach((element) => {
      console.log(element.Title);
      if (element.Title == this.selectedProject) {
        console.log(element.ProjectId);
        id = element.ProjectId;
        this.selectedProjectId = element.ProjectId;
      }
    });

    //Get Tasks for selected project from db
    // let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo') || '{}');
    let tokenInfo = localStorage.getItem('TokenInfo');

    jQuery.ajax({
      url: 'http://localhost:52497/api/ProjectTasks/GetProjectTask/' + id,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + tokenInfo,
      },
      success: (result) => {
        if (result.isOk == false) alert(result.message);
        //console.log(result);

        //Enable the AddCard Button
        this.addCardBool = true;

        //Converting JSON result to Task Objects.
        this.JsonStringTaskProject = JSON.stringify(result);
        this.TokenStartupTaskProject = JSON.parse(
          this.JsonStringTaskProject || []
        );

        console.log('Json:', this.TokenStartupTaskProject);

        if (this.TokenStartupTaskProject) {
          for (var i = 0; i < this.TokenStartupTaskProject.length; i++) {
            this.objTask = new ProjectTask(
              this.TokenStartupTaskProject[i].TaskId,
              this.TokenStartupTaskProject[i].TaskName,
              this.TokenStartupTaskProject[i].TaskStatus,
              this.TokenStartupTaskProject[i].TaskDescription,
              this.TokenStartupTaskProject[i].StartDate,
              this.TokenStartupTaskProject[i].EndDate,
              this.TokenStartupTaskProject[i].ProjectId
            );

            if (this.TokenStartupTaskProject[i].TaskPeople) {
              for (
                var j = 0;
                j < this.TokenStartupTaskProject[i].TaskPeople.length;
                j++
              ) {
                this.objTask.PeopleAdded.push(
                  this.TokenStartupTaskProject[i].TaskPeople[j].StartupTeam.Name
                );
              }
            }

            if (this.TokenStartupTaskProject[i].TaskStatus == 'Launched') {
              this.ToDo.push(this.objTask);
            } else if (
              this.TokenStartupTaskProject[i].TaskStatus == 'In Progress'
            ) {
              this.InProgress.push(this.objTask);
            } else {
              this.Done.push(this.objTask);
            }
            this.TaskList.push(this.objTask);
          }
          console.log(this.TaskList);
        }

        result.forEach((element) => {
          // console.log(element);
          //this.StartupProjects.push(element);
          // console.log("Returned Tasks:");
          // console.log(element);
        });
      },
      async: true,
    });
  }

  ngOnInit(): void {
    this._exploreService.ViewStartup().subscribe((data) => {
      data.forEach((element) => {
        this.StartupObj = new Startup(
          element.StartupId,
          element.Name,
          element.Location,
          element.Email,
          element.Technology,
          element.Description,
          element.Funding,
          element.DateFounded,
          element.UserId,
          ' '
        );
        console.log(this.StartupObj);
        this.StartupsList.push(this.StartupObj);
      });
    });
  }

  test() {
    console.log('Inside');
  }

  onClickSubmit(values: any, flag: boolean): void {
    console.log('Inside onClick.');

    if (!flag) {
      this.TaskObj = new ProjectTask(
        1,
        this.TaskName,
        'Launched',
        this.TaskDescription,
        this.TaskStartDate.toString(),
        this.TaskEndDate.toString(),
        this.selectedProjectId
      );

      //Resetting fields of card
      this.TaskName = '';
      this.TaskDescription = '';
      this.TaskStartDate = '';
      this.TaskEndDate = '';
      this.TaskId = 0;

      console.log('Task Created: ', this.TaskObj);
      this._project.AddProjectTask(this.TaskObj).subscribe(
        (data) => {
          if (this.selected.length > 0) {
            this.taskMembers = [];
            //Adding people to the task created.
            for (var i = 0; i < this.selected.length; i++) {
              this.taskMembers.push(this.selected[i].MemberId.toString());
              this.TaskObj.PeopleAdded.push(this.selected[i].Name.toString());
              // console.log("Member added: ", this.selected[i].Name.toString())
            }
            this.taskMembers.push(data.TaskId);
            console.log('People added to Task: ', this.taskMembers);

            this.selected = [];

            this._project
              .AddMemberToTask(this.taskMembers)
              .subscribe((data) => {
                this.ToDo.push(this.TaskObj);
                (<any>$('#myModal')).modal('hide');
                console.log('Complete: ', this.TaskObj);
                this.toastr.show('Task Created Successfully');
              });
          } else {
            this.ToDo.push(this.TaskObj);
            (<any>$('#myModal')).modal('hide');
            console.log('Complete: ', this.TaskObj);
            this.toastr.show('Task Created Successfully');
          }
        },
        (error) => {
          this.toastr.show('Task Creation Failed');
        }
      );
    } else {
      this.EditTaskObj = new ProjectTask(
        this.TaskId,
        this.TaskName,
        this.TaskStatus,
        this.TaskDescription,
        this.TaskStartDate,
        this.TaskEndDate,
        this.selectedProjectId
      );

      //Resetting fields of card
      this.TaskName = '';
      this.TaskDescription = '';
      this.TaskStartDate = '';
      this.TaskEndDate = '';
      this.TaskId = 0;

      this._project.EditProjectTask(this.EditTaskObj).subscribe(
        (data) => {
          this.toastr.show('Task Updation Successfully.');
          (<any>$('#myModal')).modal('hide');
        },
        (err) => {
          this.toastr.show('Task Updation Failed.');
          (<any>$('#myModal')).modal('hide');
        }
      );
    }
  }

  PassDataModal(taskid) {
    console.log('Onclick Called = ' + taskid);
    this.ModalTask = null;
    this.EditTaskid = taskid;

    for (var i = 0; i < this.TaskList.length; i++) {
      if (this.TaskList[i].TaskId == taskid) {
        this.ModalTask = this.TaskList[i];
        this.ModalFlag = true;
        console.log('Task Data Get = ', this.ModalTask);
      }
    }
  }

  OnEditTask() {
    this.EditTaskFlag = true;
    this.TaskName = this.ModalTask.TaskName;
    this.TaskStartDate = this.ModalTask.StartDate;
    this.TaskStatus = this.ModalTask.TaskStatus;
    this.TaskDescription = this.ModalTask.TaskDescription;
    this.TaskEndDate = this.ModalTask.EndDate;
    this.TaskId = this.ModalTask.TaskId;
  }

  onDeleteTask() {
    this._project.DeleteProjectTask(this.ModalTask.TaskId).subscribe(
      (data) => {
        this.toastr.show('Task Deleted Successfully');
        (<any>$('#deletetask')).modal('hide');
      },
      (err) => {
        this.toastr.show('Task Deleted Failed');
        (<any>$('#deletetask')).modal('hide');
      }
    );
  }
}
