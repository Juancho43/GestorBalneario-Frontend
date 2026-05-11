import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentEditor } from './payment-editor';

describe('PaymentEditor', () => {
  let component: PaymentEditor;
  let fixture: ComponentFixture<PaymentEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
