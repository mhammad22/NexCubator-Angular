import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  amount: number = 50;
  token: any;

  // onCheckout(){
  //   var handler = (<any>window).StripeCheckout.configure({
  //     key: 'pk_test_51J2E7wGshgYX1uZLc5wiOWeeOLcBJc3iujQhAt3buc1uuXN1LmZLjLxB4K2l8BiaRA9R3hjOkI8WpQl9XA6HDHBJ00h8K3dwpj',
  //     locale: 'auto',
  //     token: (token: any) => {
  //       this.token = `token : ${token.id}`;
  //     }
  //   });
  //   handler.open({
  //     name: 'The Code Hubs',
  //     description: 'How to integrate with Stripe checkout',
  //     amount: this.amount * 100
  //   });
  // }

  takePayment(productName: string, amount: number, token: any) {
    let body = {
      tokenId: token.id,
      productName: productName,
      amount: amount,
    };
    let bodyString = JSON.stringify(body);
  }

  openCheckout(productName: string, amount: number, tokenCallback) {
    let handler = (<any>window).StripeCheckout.configure({
      key: 'your_stripe_publishable_key',
      locale: 'auto',
      token: tokenCallback,
    });

    handler.open({
      name: 'NexCubator Services',
      description: productName,
      zipCode: false,
      currency: 'gbp',
      amount: amount,
      panelLabel: 'Pay {{amount}}',
      allowRememberMe: false,
    });
  }

  constructor() {}

  ngOnInit(): void {}
}
