import { TestBed } from '@angular/core/testing';

import { EditReservationHttp } from './edit-reservation-http';

describe('EditReservationHttp', () => {
  let service: EditReservationHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditReservationHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
