import { TestBed } from '@angular/core/testing';

import { GetInvoiceHttp } from './get-invoice-http.service';

describe('GetInvoceHttp', () => {
  let service: GetInvoiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInvoiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
