import { TestBed } from '@angular/core/testing';

import { CreateClientHttp } from './create-client-http';

describe('CreateClientHttp', () => {
  let service: CreateClientHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateClientHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
