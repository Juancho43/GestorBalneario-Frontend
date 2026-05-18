import { TestBed } from '@angular/core/testing';

import { InvoiceItemsManager } from './invoice-items-manager';

describe('InvoiceItemsManager', () => {
  let service: InvoiceItemsManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceItemsManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
