import { TestBed } from '@angular/core/testing';

import { PaymentManager } from './payment-manager';

describe('PaymentManager', () => {
  let service: PaymentManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
