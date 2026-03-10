import { TestBed } from '@angular/core/testing';

import { ReservationListManager } from './reservation-list-manager';

describe('ReservationListManager', () => {
  let service: ReservationListManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationListManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
