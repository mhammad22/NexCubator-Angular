import { ExploreStartupInvestorService } from './../services/explore-startup-investor.service';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ThemeService } from 'ng2-charts';
import { Subject } from 'rxjs';
import { Startup } from '../Models/Startup';
import { ExploreStartupService } from '../services/explore-startup.service';

@Component({
  selector: 'app-explore-startups-investor',
  templateUrl: './explore-startups-investor.component.html',
  styleUrls: ['./explore-startups-investor.component.css'],
})
export class ExploreStartupsInvestorComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  viewAllStartup: Startup[] = [];
  StartupObj!: Startup;
  check1 = false;
  check2 = false;
  check3 = false;
  check4 = false;

  FundCheck1 = false;
  FundCheck2 = false;
  FundCheck3 = false;
  FundCheck4 = false;

  domains = [
    'Artificial Intelligence',
    'Blockchain',
    'Web Development',
    'Mobile Development',
  ];
  MinFunding = [0, 100000, 200000, 500000];
  MaxFunding = [100000, 200000, 500000, 1000000];

  DomainSelected = [];
  FundingSelected = [];

  constructor(private _exploreservice:ExploreStartupInvestorService) {}

  CheckFund(Fund, MinFund, MaxFund) {
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      console.log('Selected Array in Function = ', Fund);
      let min = MinFund[Fund[0]];
      let max = MaxFund[Fund[0]];
      console.log('Min Fund = ', MinFund);
      console.log('Max Fund = ', MaxFund);

      console.log(min, max);

      var d = parseFloat(data[3]);

      if (d >= min && d <= max) {
        return true;
      }
      return false;
    });
  }

  CheckDomain(Domain, SDomain) {
    $.fn.dataTable.ext.search.push(function (settings, data, dataIndex) {
      let dm = SDomain[Domain[0]];

      console.log('Domain = ', dm);

      var d = parseFloat(data[2]);

      if (dm == d) {
        return true;
      }
      return false;
    });
  }

  ApplyFilter() {
    console.log('Domain Checks');
    console.log(this.check1);
    console.log(this.check2);
    console.log(this.check3);
    console.log(this.check4);

    console.log('Funding Check');
    console.log(this.FundCheck1);
    console.log(this.FundCheck2);
    console.log(this.FundCheck3);
    console.log(this.FundCheck4);

    this.FundingSelected.length = 0;
    this.DomainSelected.length = 0;

    console.log('Fund Selected Array', this.FundingSelected.length);

    if (this.check1 == true) {
      this.DomainSelected.push(0);
    }

    if (this.check2 == true) {
      this.DomainSelected.push(1);
    }

    if (this.check3 == true) {
      this.DomainSelected.push(2);
    }

    if (this.check4 == true) {
      this.DomainSelected.push(3);
    }

    if (this.FundCheck1 == true) {
      this.FundingSelected.push(0);
    }
    if (this.FundCheck2 == true) {
      this.FundingSelected.push(1);
    }
    if (this.FundCheck3 == true) {
      this.FundingSelected.push(2);
    }
    if (this.FundCheck4 == true) {
      this.FundingSelected.push(3);
    }

    console.log('Domain Selected Index = ', this.DomainSelected);
    console.log('Fund Selected Index = ', this.FundingSelected);

    if (this.FundingSelected.length != 0) {
      this.CheckFund(this.FundingSelected, this.MinFunding, this.MaxFunding);
    }

    if(this.FundCheck1==false &&
      this.FundCheck2==false &&
      this.FundCheck3==false &&
      this.FundCheck4==false &&
      this.check1==false &&
      this.check2==false &&
      this.check3==false &&
      this.check4==false
      ){
        var table = $('#example').DataTable();
    table.draw();
      }

    //this.CheckDomain(this.DomainSelected, this.domains);
    if(this.DomainSelected.length!=0){
    var table = $('#example').DataTable();
    table.column(2).search(this.domains[this.DomainSelected[0]]).draw();
    }
    var table = $('#example').DataTable();
    table.draw();
  }

  // ngAfterViewInit(): void {
  //   // this.rerender();
  //  // this.dtTrigger.next();
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      destroy: true,
      processing: true,
    };

    //Click on View Startups
    let i = 0;
    this._exploreservice.ViewStartup().subscribe((data) => {
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
          element.StartupLogo
        );
        // console.log(this.StartupObj);
        this.viewAllStartup.push(this.StartupObj);
        console.log(this.viewAllStartup[i]);
        this.dtTrigger.next();
        i++;
      });

      // this.JsonString = JSON.stringify(data);
      // this.TokenStartup = JSON.parse(this.JsonString || {});
    });
  }

  closeNav() {
    document.getElementById('mySidepanel').style.width = '0';
  }

  openNav() {
    document.getElementById('mySidepanel').style.width = '250px';
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
