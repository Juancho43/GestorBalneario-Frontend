import {TestBed} from '@angular/core/testing';

import {ShadowManager} from './shadow-manager.service';

describe('ShadowListManager', () => {
  let service: ShadowManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShadowManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
