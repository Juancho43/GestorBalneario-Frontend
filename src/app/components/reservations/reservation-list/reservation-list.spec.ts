import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationList } from './reservation-list';

describe('ReservationList', () => {
  let component: ReservationList;
  let fixture: ComponentFixture<ReservationList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationList],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
