export class StartupProject {
  // ProjectId:number;
  Title: string;
  Description: string;
  FundsRequired: string;
  StartupId: number;
  ProjectId: number;

  member: string[];

  constructor(
    Title: string,
    Description: string,
    FundsRequired: string,
    StartupId: number,
    member: string[],
    ProjectId?: number
  ) {
    this.Description = Description;
    this.FundsRequired = FundsRequired;
    this.StartupId = StartupId;
    this.Title = Title;
    this.member = member;
    this.ProjectId = ProjectId;
  }
}
