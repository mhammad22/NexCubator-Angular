import { EventDetialsService } from './event-detials.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Events } from '../Models/Events';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  JsonStringDetailEvents: any;
  res: any;

  EventsList: Events[] = [];
  event: Events;
  eventid: string;

  constructor(
    private router: Router,
    private _EventDetail: EventDetialsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventid = this.router.url.split('/')[3];
    console.log('Event id = ', this.eventid);

    this._EventDetail.getEvents().subscribe((data: Events[]) => {
      this.JsonStringDetailEvents = JSON.stringify(data);
      this.res = JSON.parse(this.JsonStringDetailEvents || []);

      console.log(this.res);

      for (var i = 0; i < this.res.length; i++) {
        if (this.res[i].EventId == this.eventid) {
          this.event = new Events(
            this.res[i].EventId,
            this.res[i].Name,
            this.res[i].Location,
            this.res[i].Description,
            this.res[i].Date,
            this.res[i].Time,
            this.res[i].CoverImage,
            this.res[i].StartupID
          );

          this.event.index = i;
        }
      }
    });
  }

  onDeleteEvent() {
    this._EventDetail.DeleteEvent(parseInt(this.eventid)).subscribe(
      (data) => {
        this.toastr.show('Event Deleted Successfully');
        this.router.navigate(['/main-navbar']);
        (<any>$('#deleteevent')).modal('hide');
      },
      (err) => {
        this.toastr.show('Event Deletion Failed');
        this.router.navigate(['/main-navbar']);
        (<any>$('#deleteevent')).modal('hide');
      }
    );
  }
}
