import { TestBed } from '@angular/core/testing';

import { OverlayHelper } from './overlay-helper';

describe('OverlayHelper', () => {
  let service: OverlayHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
