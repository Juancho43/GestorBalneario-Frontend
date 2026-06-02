import {TestBed} from '@angular/core/testing';

import {ServiceSearch} from './service-search';

describe('ServiceSearch', () => {
  let service: ServiceSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
