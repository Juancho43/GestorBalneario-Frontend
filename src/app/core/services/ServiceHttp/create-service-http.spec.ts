import {TestBed} from '@angular/core/testing';

import {CreateServiceHttp} from './create-service-http';

describe('CreateServiceHttp', () => {
  let service: CreateServiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateServiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
