import { TestBed } from '@angular/core/testing';

import { ServiceDetailsHttp } from './service-details-http';

describe('ServiceDetailsHttp', () => {
  let service: ServiceDetailsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDetailsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
