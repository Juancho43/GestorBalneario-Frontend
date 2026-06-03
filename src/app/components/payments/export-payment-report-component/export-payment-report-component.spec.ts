import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportPaymentReportComponent } from './export-payment-report-component';

describe('ExportPaymentReportComponent', () => {
  let component: ExportPaymentReportComponent;
  let fixture: ComponentFixture<ExportPaymentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExportPaymentReportComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportPaymentReportComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
