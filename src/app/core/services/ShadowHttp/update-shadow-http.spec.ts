import { TestBed } from '@angular/core/testing';

import { UpdateShadowHttp } from './update-shadow-http';

describe('UpdateShadowHttp', () => {
  let service: UpdateShadowHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateShadowHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
