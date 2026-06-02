import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationSearcher} from './reservation-searcher';

describe('ReservationSearcher', () => {
  let component: ReservationSearcher;
  let fixture: ComponentFixture<ReservationSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
