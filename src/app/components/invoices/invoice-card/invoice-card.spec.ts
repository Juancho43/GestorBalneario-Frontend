import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCard } from './invoice-card';

describe('InvoiceCard', () => {
  let component: InvoiceCard;
  let fixture: ComponentFixture<InvoiceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCard],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
