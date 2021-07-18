export class SupportTicket {
  TicketTime: string;
  Category: string;
  Issue: string;
  Status: string;
  UserId: number;
  TicketId: number;
  Email:string;
  AdminResponse: string;

  constructor(
    TicketTime: string,
    Category: string,
    Status: string,
    Issue: string,
    UserId: number,
    TicketId: number,
    Email ? :string,
    AdminResponse ?:string
  ) {
    this.Status = Status;
    this.TicketTime = TicketTime;
    this.Issue = Issue;
    this.Category = Category;
    this.UserId = UserId;
    this.TicketId = TicketId;
    this.Email=Email;
    this.AdminResponse=AdminResponse;
  }
}
