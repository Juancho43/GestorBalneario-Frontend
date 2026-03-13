import { TestBed } from '@angular/core/testing';

import { GetReservationHttp } from './get-reservation-http';

describe('GetReservationHttp', () => {
  let service: GetReservationHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReservationHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
