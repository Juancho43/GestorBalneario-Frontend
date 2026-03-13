import { TestBed } from '@angular/core/testing';

import { ShadowListManager } from './shadow-list-manager';

describe('ShadowListManager', () => {
  let service: ShadowListManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowListManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
