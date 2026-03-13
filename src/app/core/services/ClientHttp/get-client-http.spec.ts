import { TestBed } from '@angular/core/testing';

import { GetClientHttp } from './get-client-http';

describe('GetClientHttp', () => {
  let service: GetClientHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetClientHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
