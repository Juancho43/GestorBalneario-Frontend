import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceAdjustment} from './invoice-adjustment';

describe('InvoiceAdjustment', () => {
  let component: InvoiceAdjustment;
  let fixture: ComponentFixture<InvoiceAdjustment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceAdjustment],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceAdjustment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
