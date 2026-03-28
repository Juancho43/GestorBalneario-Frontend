import { TestBed } from '@angular/core/testing';

import { CreatePaymentHttp } from './create-payment-http';

describe('CreatePaymentHttp', () => {
  let service: CreatePaymentHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePaymentHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
