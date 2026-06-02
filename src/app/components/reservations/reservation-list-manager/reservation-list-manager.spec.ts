import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ReservationListManager} from './reservation-list-manager';

describe('ReservationListManager', () => {
  let component: ReservationListManager;
  let fixture: ComponentFixture<ReservationListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationListManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationListManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
