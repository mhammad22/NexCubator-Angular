import { Component, OnInit } from '@angular/core';
import { SupportTicket } from '../Models/SupportTicket';
import { SupportService } from './support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})
export class SupportComponent implements OnInit {
  ticket: SupportTicket;

  DateTime: string;
  Category: string;
  Issue: string;
  Status: string;

  UserId:number;

  cat = [];
  Returned:string;

  constructor(private _SupportService:SupportService) {}

  ngOnInit(): void {
    this.cat = [
      { id: 1, name: 'Account Recovery' },
      { id: 2, name: 'Account Management' },
      { id: 3, name: 'Troubleshooting' },
      { id: 4, name: 'Account Removal' },
    ];
    
    this._SupportService.GetUserId().subscribe((data:number)=>{
      this.UserId=data;
      console.log(this.UserId);
    })

  }

  onClickSubmit(values: any): void {
    // console.log("Category: ", this.Category);
    // console.log("Issue: ", this.Issue);
    this.DateTime = new Date().toString();
    this.ticket = new SupportTicket(
      this.DateTime,
      this.Category,
      'Launched',
      this.Issue.trim(),
      this.UserId,
      1000
    );

    this._SupportService.AddTicketToDB(this.ticket).subscribe((data:any)=>{
      this.Returned="Your ticket number is: " + sessionStorage.getItem("TicketId");
      sessionStorage.removeItem("TicketId");
      console.log("Return value: ", this.Returned);

      document.getElementById("Ret").innerHTML=this.Returned;
      this.Issue="";
    })
  }
}
