import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewPaymentSideSheet} from './new-payment-side-sheet.component';

describe('NewPaymentDialog', () => {
  let component: NewPaymentSideSheet;
  let fixture: ComponentFixture<NewPaymentSideSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPaymentSideSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPaymentSideSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
