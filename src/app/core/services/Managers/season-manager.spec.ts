import { TestBed } from '@angular/core/testing';

import { SeasonManager } from './season-manager';

describe('SeasonManager', () => {
  let service: SeasonManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
