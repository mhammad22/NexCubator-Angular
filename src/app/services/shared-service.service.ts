import { StartupTeam } from './../Models/StartupTeam';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  AvailableTeam: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  loadTeamData(Team:any){
    this.AvailableTeam.next(Team);
  }

  getTeamData(){
     return this.AvailableTeam;
  }


}
