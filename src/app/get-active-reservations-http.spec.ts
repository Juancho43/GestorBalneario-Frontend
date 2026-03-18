import { TestBed } from '@angular/core/testing';

import { GetActiveReservationsHttp } from './get-active-reservations-http';

describe('GetActiveReservationsHttp', () => {
  let service: GetActiveReservationsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActiveReservationsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
