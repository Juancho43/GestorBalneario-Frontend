import {TestBed} from '@angular/core/testing';

import {ReservationManager} from './reservation-manager.service';

describe('ReservationListManager', () => {
  let service: ReservationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
