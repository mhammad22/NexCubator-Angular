import { Component, OnInit } from '@angular/core';
import { PaymentComponent } from '../payment/payment.component';
import { ViewServicesService } from './view-services.service';

@Component({
  selector: 'app-view-services',
  templateUrl: './view-services.component.html',
  styleUrls: ['./view-services.component.css'],
})
export class ViewServicesComponent implements OnInit {
  constructor(private serivce: ViewServicesService) {}

  ngOnInit(): void {}

  openCheckout(productName: string, amount: number, tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51J2E7wGshgYX1uZLc5wiOWeeOLcBJc3iujQhAt3buc1uuXN1LmZLjLxB4K2l8BiaRA9R3hjOkI8WpQl9XA6HDHBJ00h8K3dwpj',
      locale: 'auto',
      token: tokenCallback,
    });

    handler.open({
      name: 'NexCubator Services',
      description: productName,
      zipCode: false,
      currency: 'usd',
      amount: amount * 100,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false,
    });
  }

  buyProjectManagement() {
    this.openCheckout('Project Management', 15, (token: any) =>
      this.serivce
        .takePayment('Project Management', 15, token)
        .subscribe((data) => {})
    );
  }
  buyEventManagement() {
    this.openCheckout('Event Management', 15, (token: any) =>
      this.serivce
        .takePayment('Event Management', 15, token)
        .subscribe((data) => {})
    );
  }
  buyDigitalMarketing() {
    this.openCheckout('Digital Marketing', 20, (token: any) =>
      this.serivce
        .takePayment('Digital Marketing', 20, token)
        .subscribe((data) => {})
    );
  }
}
