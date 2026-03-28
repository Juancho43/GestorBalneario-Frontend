import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManager } from './payment-manager';

describe('PaymentManager', () => {
  let component: PaymentManager;
  let fixture: ComponentFixture<PaymentManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentManager],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
