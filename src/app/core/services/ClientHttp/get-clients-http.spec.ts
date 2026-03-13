import { TestBed } from '@angular/core/testing';

import { GetClientsHttp } from './get-clients-http';

describe('GetClientsHttp', () => {
  let service: GetClientsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
