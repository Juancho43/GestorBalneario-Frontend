import { TestBed } from '@angular/core/testing';

import { GetServicesHttp } from './get-services-http';

describe('GetServicesHttp', () => {
  let service: GetServicesHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetServicesHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
