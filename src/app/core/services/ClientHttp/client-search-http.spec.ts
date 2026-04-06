import { TestBed } from '@angular/core/testing';

import { ClientSearchHttp } from './client-search-http';

describe('ClientSearchHttp', () => {
  let service: ClientSearchHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSearchHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
