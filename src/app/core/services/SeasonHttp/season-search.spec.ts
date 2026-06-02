import {TestBed} from '@angular/core/testing';

import {SeasonSearch} from './season-search';

describe('SeasonSearch', () => {
  let service: SeasonSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
