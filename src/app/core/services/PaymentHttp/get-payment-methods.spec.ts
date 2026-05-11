import { TestBed } from '@angular/core/testing';

import { GetPaymentMethods } from './get-payment-methods';

describe('GetPaymentMethods', () => {
  let service: GetPaymentMethods;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPaymentMethods);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
