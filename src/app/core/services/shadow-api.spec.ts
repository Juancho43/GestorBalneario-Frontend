import { TestBed } from '@angular/core/testing';

import { ShadowMapper } from './shadow-mapper.service';

describe('ShadowApi', () => {
  let service: ShadowMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
