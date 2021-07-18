import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-investor-home-page',
  templateUrl: './investor-home-page.component.html',
  styleUrls: ['./investor-home-page.component.css']
})
export class InvestorHomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lineChartData: ChartDataSets[] = [
    { data: [22, 72, 97, 75, 45, 75,66,90,44,100,85,100], label: 'Earning Overview of 1st Year' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June','July','Aug','Sep','Oct','Nov', 'Dec'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';


  doughnutChartLabels: Label[] = ['Organic', 'Referrel', 'Paid'];
  doughnutChartData: MultiDataSet = [
    [30, 60, 10]
  ];
  doughnutChartType: ChartType = 'doughnut';
  

}
