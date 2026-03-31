import { TestBed } from '@angular/core/testing';

import { CreateSeasonHttp } from './create-season-http';

describe('CreateSeasonHttp', () => {
  let service: CreateSeasonHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSeasonHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
