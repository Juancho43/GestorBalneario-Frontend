import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationFilters} from './reservation-filters';

describe('ReservationFilters', () => {
  let component: ReservationFilters;
  let fixture: ComponentFixture<ReservationFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
