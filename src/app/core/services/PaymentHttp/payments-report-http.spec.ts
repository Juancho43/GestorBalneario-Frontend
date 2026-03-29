import { TestBed } from '@angular/core/testing';

import { PaymentsReportHttp } from './payments-report-http';

describe('PaymentsReportHttp', () => {
  let service: PaymentsReportHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsReportHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
