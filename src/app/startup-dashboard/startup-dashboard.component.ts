import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color,Label,MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-startup-dashboard',
  templateUrl: './startup-dashboard.component.html',
  styleUrls: ['./startup-dashboard.component.css'],
})
export class StartupDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75,80,90,44,50,90,100], label: 'Earning Overview of 1st Year' },
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
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';
  
}
