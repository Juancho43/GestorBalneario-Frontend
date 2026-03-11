import { TestBed } from '@angular/core/testing';

import { GetCurrentShadowsHttp } from './get-current-shadows-http';

describe('GetCurrentShadowsHttp', () => {
  let service: GetCurrentShadowsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrentShadowsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
