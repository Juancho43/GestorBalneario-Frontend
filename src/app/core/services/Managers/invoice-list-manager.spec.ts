import { TestBed } from '@angular/core/testing';

import { InvoiceManager } from './invoice-manager.service';

describe('InvoiceListManager', () => {
  let service: InvoiceManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
