import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceFilters} from './invoice-filters';

describe('InvoiceFilters', () => {
  let component: InvoiceFilters;
  let fixture: ComponentFixture<InvoiceFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
