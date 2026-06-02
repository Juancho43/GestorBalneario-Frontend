import {TestBed} from '@angular/core/testing';

import {ShadowSearch} from './shadow-search';

describe('ShadowSearch', () => {
  let service: ShadowSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
