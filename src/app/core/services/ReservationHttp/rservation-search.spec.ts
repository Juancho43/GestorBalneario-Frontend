import {TestBed} from '@angular/core/testing';

import {ReservationSearch} from './reservation-search.service';

describe('ReservationSearch', () => {
  let service: ReservationSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
