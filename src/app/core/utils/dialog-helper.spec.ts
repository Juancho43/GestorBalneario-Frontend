import {TestBed} from '@angular/core/testing';

import {DialogHelper} from './dialog-helper';

describe('DialogHelper', () => {
  let service: DialogHelper;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogHelper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
