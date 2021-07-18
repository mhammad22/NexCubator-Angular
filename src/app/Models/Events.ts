export class Events {
  EventId: number;
  Name: string;
  Location: string;
  Description: string;
  Date: string;
  Time: string;
  CoverImage: string;
  StartupID: number;

  index:number;

  constructor(
    EventId: number,
    Name: string,
    Location: string,
    Description: string,
    Date: string,
    Time: string,
    CoverImage: string,
    StartupId: number
  ) {
    this.EventId = EventId;
    this.Name = Name;
    this.Location = Location;
    this.Description = Description;
    this.Date = Date;
    this.Time = Time;
    this.CoverImage = CoverImage;
    this.StartupID = StartupId;
  }
}
