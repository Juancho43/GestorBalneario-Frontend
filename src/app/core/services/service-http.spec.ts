import { TestBed } from '@angular/core/testing';

import { ServiceHttp } from './service-http';

describe('ServiceHttp', () => {
  let service: ServiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
