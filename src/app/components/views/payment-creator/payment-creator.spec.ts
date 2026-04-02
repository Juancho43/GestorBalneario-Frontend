import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreator } from './payment-creator';

describe('PaymentCreator', () => {
  let component: PaymentCreator;
  let fixture: ComponentFixture<PaymentCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentCreator],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
