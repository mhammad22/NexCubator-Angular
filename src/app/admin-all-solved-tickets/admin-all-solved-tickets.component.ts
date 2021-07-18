import { AdminAllSolvedTicketsService } from './admin-all-solved-tickets.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { SupportTicket } from '../Models/SupportTicket';

@Component({
  selector: 'app-admin-all-solved-tickets',
  templateUrl: './admin-all-solved-tickets.component.html',
  styleUrls: ['./admin-all-solved-tickets.component.css'],
})
export class AdminAllSolvedTicketsComponent
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

  constructor(private _AllSolvedTickets: AdminAllSolvedTicketsService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      processing: true,
    };

    //Get All tickets from API
    this._AllSolvedTickets.GetAllSolvedTickets().subscribe((data) => {
      this.JsonStringTicket = JSON.stringify(data);
      this.TokenTicket = JSON.parse(this.JsonStringTicket || []);

      if (this.TokenTicket) {
        for (var i = 0; i < this.TokenTicket.length; i++) {
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
}
