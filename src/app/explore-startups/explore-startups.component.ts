import { Startup } from './../Models/Startup';
import { ExploreStartupService } from './../services/explore-startup.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-explore-startups',
  templateUrl: './explore-startups.component.html',
  styleUrls: ['./explore-startups.component.css'],
})
export class ExploreStartupsComponent
  implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  JsonString: any;
  TokenStartup: any;
  viewAllStartup: Startup[] = [];
  StartupObj!: Startup;

  constructor(private _exploreService: ExploreStartupService) {}
  
  ngAfterViewInit(): void {
    this.rerender();
    this.dtTrigger.next();
    throw new Error('Method not implemented.');
  }

  //get all startups and store in view all startups fields
  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      processing: true,
    };

    //Click on View Startups
    let i = 0;
    this._exploreService.ViewStartup().subscribe((data) => {
      data.forEach((element) => {
        if (element.StartupLogo) {
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
            element.StartupLogo
          );
        }
        // console.log(this.StartupObj);
        this.viewAllStartup.push(this.StartupObj);
        console.log(this.viewAllStartup[i]);
        this.dtTrigger.next();
        i++;
      });

      // console.log(data);
      // this.JsonString = JSON.stringify(data);
      // this.TokenStartup = JSON.parse(this.JsonString || {});
    });
    // this._exploreService.SameedTest().subscribe(data=>{

    // });
  }

  submit() {
    console.log('Lenght =' + this.viewAllStartup.length);
    for (var j = 0; j < this.viewAllStartup.length; j++) {
      console.log(this.viewAllStartup[j]);
    }
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
