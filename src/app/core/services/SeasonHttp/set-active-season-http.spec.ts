import { TestBed } from '@angular/core/testing';

import { SetActiveSeasonHttp } from './set-active-season-http';

describe('SetActiveSeasonHttp', () => {
  let service: SetActiveSeasonHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetActiveSeasonHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
