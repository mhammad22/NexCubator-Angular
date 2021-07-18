export class Startup {
  StartupId: number;
  Name: string;
  Location: string;
  Email: string;
  Technology: string;
  Description: string;
  Funding: number;
  DateFounded: Date;
  UserId: number;
  StartupLogo: string;

  constructor(
    StartupId: number,
    Name: string,
    Location: string,
    Email: string,
    Technology: string,
    Description: string,
    Funding: number,
    DateFounded: Date,
    UserId: number,
    StartupLogo: string
  ) {
    this.StartupId = StartupId;
    this.Name = Name;
    this.Location = Location;
    this.Email = Email;
    this.Technology = Technology;
    this.Description = Description;
    this.Funding = Funding;
    this.DateFounded = DateFounded;
    this.UserId = UserId;
    this.StartupLogo = StartupLogo;
  }
}
