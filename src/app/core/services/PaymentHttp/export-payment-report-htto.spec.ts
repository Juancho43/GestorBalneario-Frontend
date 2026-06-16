import {TestBed} from '@angular/core/testing';

import {ExportPaymentReportHtto} from './export-payment-report-http';

describe('ExportPaymentReportHtto', () => {
  let service: ExportPaymentReportHtto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportPaymentReportHtto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
