import { TestBed } from '@angular/core/testing';

import { SeasonDetailsHttp } from './season-details-http';

describe('SeasonDetailsHttp', () => {
  let service: SeasonDetailsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonDetailsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
