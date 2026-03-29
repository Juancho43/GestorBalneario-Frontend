import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetails } from './invoice-details';

describe('InvoiceDetails', () => {
  let component: InvoiceDetails;
  let fixture: ComponentFixture<InvoiceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
