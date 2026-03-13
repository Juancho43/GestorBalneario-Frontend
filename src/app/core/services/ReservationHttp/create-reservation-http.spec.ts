import { TestBed } from '@angular/core/testing';

import { CreateReservationHttp } from './create-reservation-http';

describe('CreateReservationHttp', () => {
  let service: CreateReservationHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateReservationHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
