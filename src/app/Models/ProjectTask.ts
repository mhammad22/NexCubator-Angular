export class ProjectTask {
  TaskId: number;
  TaskName: string;
  TaskStatus: string;
  TaskDescription: string;
  StartDate: string;
  EndDate: string;

  ProjectId: number;

  PeopleAdded: string[] = [];

  constructor(
    TaskId: number,
    TaskName: string,
    TaskStatus: string,
    TaskDescription: string,
    StartDate: string,
    EndDate: string,
    ProjectId: number
  ) {
    this.TaskId = TaskId;
    this.TaskName = TaskName;
    this.TaskStatus = TaskStatus;
    this.TaskDescription = TaskDescription;
    this.StartDate = StartDate;
    this.EndDate = EndDate;
    this.ProjectId = ProjectId;
  }
}
