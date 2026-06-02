import {TestBed} from '@angular/core/testing';

import {ClientDetailHttp} from './client-detail-http';

describe('ClientDetailHttp', () => {
  let service: ClientDetailHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientDetailHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
