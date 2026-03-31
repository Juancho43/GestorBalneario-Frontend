import { TestBed } from '@angular/core/testing';

import { GetCurrentSeason } from './get-current-season';

describe('GetCurrentSeason', () => {
  let service: GetCurrentSeason;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCurrentSeason);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
