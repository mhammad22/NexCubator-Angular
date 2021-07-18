import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from '../Models/PaymentMethod';

@Component({
  selector: 'app-view-payment-methods',
  templateUrl: './view-payment-methods.component.html',
  styleUrls: ['./view-payment-methods.component.css'],
})
export class ViewPaymentMethodsComponent implements OnInit {
  constructor() {}

  paymentMethods: PaymentMethod[] = [];
  
  ngOnInit(): void {}
}
