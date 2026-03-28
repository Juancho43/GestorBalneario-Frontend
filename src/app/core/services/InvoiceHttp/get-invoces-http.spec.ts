import { TestBed } from '@angular/core/testing';

import { GetInvoicesHttp } from './get-invoices-http.service';

describe('GetInvocesHttp', () => {
  let service: GetInvoicesHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInvoicesHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
