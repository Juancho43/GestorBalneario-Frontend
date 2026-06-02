import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceItemForm} from './invoice-item-form.component';

describe('InvoiceAdjustmentForm', () => {
  let component: InvoiceItemForm;
  let fixture: ComponentFixture<InvoiceItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceItemForm],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceItemForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
