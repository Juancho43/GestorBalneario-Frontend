import { TestBed } from '@angular/core/testing';

import { InvoiceListManager } from './invoice-list-manager';

describe('InvoiceListManager', () => {
  let service: InvoiceListManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceListManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
