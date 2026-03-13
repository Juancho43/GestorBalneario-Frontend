import { TestBed } from '@angular/core/testing';

import { GetShadowHttp } from './get-shadow-http';

describe('GetShadowHttp', () => {
  let service: GetShadowHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShadowHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
