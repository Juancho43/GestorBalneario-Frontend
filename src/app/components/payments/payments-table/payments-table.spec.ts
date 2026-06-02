import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PaymentsTable} from './payments-table';

describe('PaymentsTable', () => {
  let component: PaymentsTable;
  let fixture: ComponentFixture<PaymentsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
