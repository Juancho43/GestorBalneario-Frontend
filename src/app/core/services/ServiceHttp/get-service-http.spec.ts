import { TestBed } from '@angular/core/testing';

import { GetServiceHttp } from './get-service-http';

describe('GetServiceHttp', () => {
  let service: GetServiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetServiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
