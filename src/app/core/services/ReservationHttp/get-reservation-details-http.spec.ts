import { TestBed } from '@angular/core/testing';

import { GetReservationDetailsHttp } from './get-reservation-details-http';

describe('GetReservationDetailsHttp', () => {
  let service: GetReservationDetailsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetReservationDetailsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
