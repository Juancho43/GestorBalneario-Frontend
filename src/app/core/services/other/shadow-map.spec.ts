import {TestBed} from '@angular/core/testing';

import {ShadowMap} from './shadow-map';

describe('ShadowMap', () => {
  let service: ShadowMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
