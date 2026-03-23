import { TestBed } from '@angular/core/testing';

import { ShadowMapHttp } from './shadow-map-http';

describe('ShadowMapHttp', () => {
  let service: ShadowMapHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowMapHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
