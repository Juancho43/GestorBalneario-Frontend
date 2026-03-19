import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCard } from './reservation-card';

describe('ReservationCard', () => {
  let component: ReservationCard;
  let fixture: ComponentFixture<ReservationCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
