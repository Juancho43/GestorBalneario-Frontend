import {TestBed} from '@angular/core/testing';

import {ShadowMapHelpers} from './shadow-map-helpers';

describe('ShadowMapHelpers', () => {
  let service: ShadowMapHelpers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowMapHelpers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
