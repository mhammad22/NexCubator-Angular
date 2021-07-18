import { Startup } from './Startup';
export class StartupTeam {
  MemberId:number;
  Name: string;
  Location: string;
  Email: string;
  Designation: string;
  LinkedInProfile: string;
  Image: string;
  StartupID: number;

  constructor(
    MemberId:number,
    Name: string,
    Location: string,
    Email: string,
    Designation: string,
    LinkedInProfile: string,
    Image: string,
    StartupID: number
  ) {
    this.Designation = Designation;
    this.Email = Email;
    this.Image = Image;
    this.LinkedInProfile = LinkedInProfile;
    this.Location = Location;
    this.MemberId=MemberId;
    this.Name = Name;
    this.StartupID = StartupID;
  }
}
