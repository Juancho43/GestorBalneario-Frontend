import { TestBed } from '@angular/core/testing';

import { GetSeasonsHttp } from './get-seasons-http';

describe('GetSeasonsHttp', () => {
  let service: GetSeasonsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetSeasonsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
