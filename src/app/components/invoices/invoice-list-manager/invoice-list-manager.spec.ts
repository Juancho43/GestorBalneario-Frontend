import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceListManager } from './invoice-list-manager';

describe('InvoiceListManager', () => {
  let component: InvoiceListManager;
  let fixture: ComponentFixture<InvoiceListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceListManager],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceListManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
