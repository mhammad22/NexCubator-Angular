import { AdminAllStartupService } from './admin-all-startup.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Startup } from '../Models/Startup';

@Component({
  selector: 'app-admin-all-startups',
  templateUrl: './admin-all-startups.component.html',
  styleUrls: ['./admin-all-startups.component.css'],
})
export class AdminAllStartupsComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  JsonString: any;
  TokenStartup: any;
  viewAllStartup: Startup[] = [];
  StartupObj!: Startup;

  ngAfterViewInit(): void {
    this.rerender();
    this.dtTrigger.next();
    throw new Error('Method not implemented.');
  }

  constructor(private _AllStartup:AdminAllStartupService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      processing: true,
    };

    //Get all startups from Startup API
     //Click on View Startups
     let i = 0;
     this._AllStartup.ViewStartup().subscribe((data) => {
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


  }

  submit(){

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
