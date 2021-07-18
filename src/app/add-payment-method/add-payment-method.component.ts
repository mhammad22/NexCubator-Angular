import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddPaymentMethodService } from './add-payment-method.service';

@Component({
  selector: 'app-add-payment-method',
  templateUrl: './add-payment-method.component.html',
  styleUrls: ['./add-payment-method.component.css'],
})
export class AddPaymentMethodComponent implements OnInit {
  month = [];
  year = [];
  constructor(
    private service: AddPaymentMethodService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  selectedMonth: string;
  selectedYear: string;
  cardNum: string;
  cvc: string;
  routeBuilt: string;

  flag: Boolean = true;

  ngOnInit(): void {
    //Get Payment Method
    this.service.GetPaymentMethd().subscribe((data) => {
      if (data != '') {
        console.log('Payment Already Subscribed');

        this.flag = false;
      }
    });

    this.month = [
      { id: 1, name: 'January' },
      { id: 2, name: 'February' },
      { id: 3, name: 'March' },
      { id: 4, name: 'April' },
      { id: 5, name: 'May' },
      { id: 6, name: 'June' },
      { id: 7, name: 'July' },
      { id: 8, name: 'August' },
      { id: 9, name: 'September' },
      { id: 10, name: 'October' },
      { id: 11, name: 'November' },
      { id: 12, name: 'December' },
    ];

    this.year = [
      { id: 1, name: '2021' },
      { id: 2, name: '2022' },
      { id: 3, name: '2023' },
      { id: 4, name: '2024' },
      { id: 5, name: '2025' },
      { id: 6, name: '2026' },
    ];
  }

  onClickSubmit(val: any) {
    let body = {
      CardNum: this.cardNum,
      ExpMonth: this.selectedMonth,
      ExpYear: this.selectedYear,
      cvc: this.cvc,
    };
    let bodyString = JSON.stringify(body);

    console.log(bodyString);
    this.service.addPaymentMethod(bodyString).subscribe(
      (data) => {
        this.routeBuilt = 'main-navbar/explore-startups';
        this.router.navigate([this.routeBuilt]);
        this.toastr.show('Payment Method Added Successfully');
      },
      (err) => {
        this.toastr.show('An error occured in processing the request.');
      }
    );
  }


}
