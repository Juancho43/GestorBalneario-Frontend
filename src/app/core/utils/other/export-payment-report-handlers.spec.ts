import { TestBed } from '@angular/core/testing';

import { ExportPaymentReportHandlers } from './export-payment-report-handlers';

describe('ExportPaymentReportHandlers', () => {
  let service: ExportPaymentReportHandlers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportPaymentReportHandlers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
