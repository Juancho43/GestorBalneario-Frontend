import { TestBed } from '@angular/core/testing';

import { InvoiceDetailHttp } from './invoice-detail-http';

describe('InvoiceDetailHttp', () => {
  let service: InvoiceDetailHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceDetailHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
