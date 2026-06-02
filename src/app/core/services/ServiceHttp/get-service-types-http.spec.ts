import {TestBed} from '@angular/core/testing';

import {GetServiceTypesHttp} from './get-service-types-http';

describe('GetServiceTypesHttp', () => {
  let service: GetServiceTypesHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetServiceTypesHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
