import { TestBed } from '@angular/core/testing';

import { GetShadowHistoryHttp } from './get-shadow-history-http';

describe('GetShadowHistoryHttp', () => {
  let service: GetShadowHistoryHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShadowHistoryHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
