import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { currentSeasonGuard } from './current-season-guard';

describe('currentSeasonGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => currentSeasonGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
