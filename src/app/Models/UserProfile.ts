import { Startup } from './Startup';

export class UserProfile {
  UserId: number;
  Name: string;
  Gender: string;
  Nationality: string;
  Phone: string;
  Email: string;
  Startups: Startup[];

  constructor(
    UserId: number,
    Name: string,
    Gender: string,
    Nationality: string,
    Phone: string,
    Email: string,
    Startups: Startup[]
  ) {
    this.Email = Email;
    this.Gender = Gender;
    this.Name = Name;
    this.Nationality = Nationality;
    this.Phone = Phone;
    this.UserId = UserId;
    this.Startups = Startups;
  }
}
