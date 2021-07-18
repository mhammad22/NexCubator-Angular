import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Events } from '../Models/Events';
import { Startup } from '../Models/Startup';
import { ExploreStartupService } from '../services/explore-startup.service';
import { AddEventFormService } from './add-event-form.service';

@Component({
  selector: 'app-add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.css'],
})
export class AddEventFormComponent implements OnInit {
  name: string;
  location: string;
  email: string;
  category: string;
  description: string;
  funding: string;
  date: string;
  time: string;
  coverImage: string;

  files: any;

  event: Events;

  selectedStartup: string;
  StartupObj: Startup;
  StartupsList: Startup[] = [];

  EditEvent: string;
  eid: string;

  JsonStringDetailEvents: any;
  res: any;

  EventsList: Events[] = [];
  eventedit: Events;

  EditEventFlag = false;

  EditEventApi: Events;

  constructor(
    private toastr: ToastrService,
    private addEventService: AddEventFormService,
    private _exploreService: ExploreStartupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.EditEvent = this.router.url.split('/')[2];
    this.eid = this.router.url.split('/')[3];

    console.log('Event id = ', this.eid);

    if (this.EditEvent == 'edit-event') {
      this.EditEventFlag = true;
    }

    this._exploreService.ViewStartup().subscribe((data) => {
      data.forEach((element) => {
        this.StartupObj = new Startup(
          element.StartupId,
          element.Name,
          element.Location,
          element.Email,
          element.Technology,
          element.Description,
          element.Funding,
          element.DateFounded,
          element.UserId,
          ' '
        );
        console.log(this.StartupObj);
        this.StartupsList.push(this.StartupObj);
      });
    });

    //Event Details Get
    this.addEventService.getEvents().subscribe((data: Events[]) => {
      this.JsonStringDetailEvents = JSON.stringify(data);
      this.res = JSON.parse(this.JsonStringDetailEvents || []);

      console.log(this.res);

      for (var i = 0; i < this.res.length; i++) {
        if (this.res[i].EventId == this.eid) {
          this.eventedit = new Events(
            this.res[i].EventId,
            this.res[i].Name,
            this.res[i].Location,
            this.res[i].Description,
            this.res[i].Date,
            this.res[i].Time,
            this.res[i].CoverImage,
            this.res[i].StartupID
          );

          this.eventedit.index = i;
        }
      }
      console.log('Event Detail = ', this.eventedit);

      this.name = this.eventedit.Name;
      this.location = this.eventedit.Location;
      this.description = this.eventedit.Description;
      this.time = this.eventedit.Time;
      this.date = this.eventedit.Date;
      this.selectedStartup = this.eventedit.StartupID.toString();
    });
  }

  ViewSelectedStartup() {
    console.log(this.selectedStartup);
  }

  onChange(event: any) {
    this.files = event.srcElement.files[0];
    console.log(this.files);
  }

  onClickSubmit(val: any) {
    if (!this.EditEventFlag) {
      let CLOUDINARY_URL =
        'https://api.cloudinary.com/v1_1/nexcubator/image/upload';
      let CLOUDINARY_UPLOAD_PRESET = 'eventlogo';

      const formData = new FormData();
      formData.append('file', this.files);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      let returnUrl = null;

      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.secure_url !== '') {
            // const uploadedFileUrl = data.secure_url;
            returnUrl = data.secure_url;
            console.log(returnUrl);

            let StartupId = 0;

            for (var i = 0; i < this.StartupsList.length; i++) {
              if (this.StartupsList[i].Name == this.selectedStartup) {
                StartupId = this.StartupsList[i].StartupId;
              }
            }

            this.event = new Events(
              1,
              this.name,
              this.location,
              this.description,
              this.date,
              this.time,
              returnUrl,
              StartupId
            );
            console.log('Created Event:', this.event);

            this.addEventService.AddEvent(this.event).subscribe((data) => {
              //this.routeBuilt = 'main-navbar/explore-startups';
              //this.router.navigate([this.routeBuilt]);
              this.toastr.show('Event Added Successfully');
              this.router.navigate(['/main-navbar/explore-events']);
            });
          }
        })
        .catch((err) => console.error(err));
    } else {
      this.EditEventApi = new Events(
        parseInt(this.eid),
        this.name,
        this.location,
        this.description,
        this.date,
        this.time,
        ' ',
        parseInt(this.selectedStartup)
      );

      this.addEventService.EditEvent(this.EditEventApi).subscribe(
        (data) => {
          this.toastr.show('Event Updated Successfully');
          this.router.navigate(['/main-navbar/explore-events']);
        },
        (err) => {
          this.toastr.show('Event Updation Failed');
          this.router.navigate(['/main-navbar/explore-events']);
        }
      );
    }
  }
}
