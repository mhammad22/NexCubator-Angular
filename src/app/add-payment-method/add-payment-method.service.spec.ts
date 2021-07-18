import { TestBed } from '@angular/core/testing';

import { AddPaymentMethodService } from './add-payment-method.service';

describe('AddPaymentMethodService', () => {
  let service: AddPaymentMethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPaymentMethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
