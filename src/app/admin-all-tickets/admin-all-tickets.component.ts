import { SupportTicket } from './../Models/SupportTicket';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AdminAllTicketsService } from './admin-all-tickets.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-admin-all-tickets',
  templateUrl: './admin-all-tickets.component.html',
  styleUrls: ['./admin-all-tickets.component.css'],
})
export class AdminAllTicketsComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  TicketArr: SupportTicket[] = [];
  TicketObj: SupportTicket;

  JsonStringTicket: any;
  TokenTicket: any;
  EmailToken: any;
  AdminMessage: string;

  AdminMsg: string;

  constructor(private _AllTicket: AdminAllTicketsService) {}

  ngOnInit(): void {
    this.AdminMessage = 'Click to Resolve';
    this.AdminMsg = 'Click to Resolve';

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      processing: true,
    };

    //Get All tickets from API
    this._AllTicket.GetAllTickets().subscribe((data) => {
      this.JsonStringTicket = JSON.stringify(data);
      this.TokenTicket = JSON.parse(this.JsonStringTicket || []);

      if (this.TokenTicket) {
        for (var i = 0; i < this.TokenTicket.length; i++) {
          // this.EmailToken=this.TokenTicket[i].User;

          if (this.TokenTicket[i].Status == 'Launched') {
            this.AdminMsg = 'Click to Resolve';
          } else {
            this.AdminMsg = 'Resolved';
          }

          this.TicketObj = new SupportTicket(
            this.TokenTicket[i].TicketTime.toString().split(' GMT')[0],
            this.TokenTicket[i].Category,
            this.TokenTicket[i].Status,
            this.TokenTicket[i].Issue,
            this.TokenTicket[i].UserId,
            this.TokenTicket[i].TicketId,
            this.TokenTicket[i].User.Email,
            this.AdminMsg
          );

          this.TicketArr.push(this.TicketObj);
          this.dtTrigger.next();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.rerender();
    this.dtTrigger.next();
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  onStatusChange(statusid) {
    //on runtime change status
    document.getElementById(statusid).innerHTML = 'Resolved';

    this._AllTicket.ResolveTicket(statusid).subscribe((data) => {});

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}
