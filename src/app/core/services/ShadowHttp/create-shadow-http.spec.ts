import { TestBed } from '@angular/core/testing';

import { CreateShadowHttp } from './create-shadow-http';

describe('CreateShadowHttp', () => {
  let service: CreateShadowHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateShadowHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
