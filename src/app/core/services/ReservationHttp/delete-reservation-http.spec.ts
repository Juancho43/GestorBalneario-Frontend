import { TestBed } from '@angular/core/testing';

import { DeleteReservationHttp } from './delete-reservation-http';

describe('DeleteReservationHttp', () => {
  let service: DeleteReservationHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteReservationHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
