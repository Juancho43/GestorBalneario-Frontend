import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationEdit } from './reservation-edit';

describe('ReservationEdit', () => {
  let component: ReservationEdit;
  let fixture: ComponentFixture<ReservationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
