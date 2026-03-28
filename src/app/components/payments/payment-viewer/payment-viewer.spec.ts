import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentViewer } from './payment-viewer';

describe('PaymentViewer', () => {
  let component: PaymentViewer;
  let fixture: ComponentFixture<PaymentViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
