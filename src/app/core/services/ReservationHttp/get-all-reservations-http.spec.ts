import { TestBed } from '@angular/core/testing';

import { GetAllReservationsHttp } from './get-all-reservations-http';

describe('GetAllReservationsHttp', () => {
  let service: GetAllReservationsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllReservationsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
