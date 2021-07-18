import { StartupPitch } from './../Models/StartupPitch';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddPitchService } from '../services/add-pitch.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-pitch-form',
  templateUrl: './add-pitch-form.component.html',
  styleUrls: ['./add-pitch-form.component.css'],
})
export class AddPitchFormComponent implements OnInit {
  problemStatement: string;
  proposedSolution: string;
  valueProposition: string;
  marketPlan: string;

  startupid: number;
  StartupPitchObj: StartupPitch;
  routeBuilt: string;

  sid: string;
  pitchName: string;
  EditPitch = false;

  JsonStringDetailStartup: any;
  TokenStartupDetailStartup: any;
  StartupDetail: any;
  StartupPitch: any;

  constructor(
    private _AddPitch: AddPitchService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.sid = this.router.url.split('/')[3];
    this.pitchName = this.router.url.split('/')[2];

    if (this.pitchName == 'edit-pitch') {
      this.EditPitch = true;
      this._AddPitch.StartupDetails(this.sid).subscribe((data) => {
        this.JsonStringDetailStartup = JSON.stringify(data);
        this.TokenStartupDetailStartup = JSON.parse(
          this.JsonStringDetailStartup || []
        );

        this.StartupDetail = this.TokenStartupDetailStartup.startup;
        this.StartupPitch = this.StartupDetail.Pitch;
        this.problemStatement = this.StartupPitch.ProblemStatement;
        this.proposedSolution = this.StartupPitch.ProposedSolution;
        this.valueProposition = this.StartupPitch.ValueProposition;
        this.marketPlan = this.StartupPitch.MarketPlan;
      });
    }
  }

  onClickSubmit() {
    this.startupid = parseInt(this.router.url.split('/')[3]);
    this.StartupPitchObj = new StartupPitch(
      this.problemStatement,
      this.proposedSolution,
      this.valueProposition,
      this.marketPlan,
      this.startupid
    );

    if (this.pitchName != 'edit-pitch') {
      //API call to Add pitch in the database
      this._AddPitch.AddPitch(this.StartupPitchObj).subscribe(
        (data) => {
          console.log('Inside component: ', data);
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Pitch Added Successfully');
        },
        (err) => {
          this.toastr.show('Pitch already exists!');
        }
      );
    } else {
      this._AddPitch.EditPitch(this.StartupPitchObj).subscribe(
        (data) => {
          console.log('Inside component: ', data);
          this.routeBuilt = 'main-navbar/startupdetail/' + this.startupid;
          this.router.navigate([this.routeBuilt]);
          this.toastr.show('Pitch Updated Successfully');
        },
        (err) => {
          this.toastr.show('Pitch Updation Failed!');
        }
      );
    }
  }
}
