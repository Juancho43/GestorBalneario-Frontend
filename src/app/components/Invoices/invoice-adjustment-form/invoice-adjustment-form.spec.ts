import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceAdjustmentForm } from './invoice-adjustment-form';

describe('InvoiceAdjustmentForm', () => {
  let component: InvoiceAdjustmentForm;
  let fixture: ComponentFixture<InvoiceAdjustmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAdjustmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceAdjustmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
