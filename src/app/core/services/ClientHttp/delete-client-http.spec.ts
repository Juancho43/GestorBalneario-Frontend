import { TestBed } from '@angular/core/testing';

import { DeleteClientHttp } from './delete-client-http';

describe('DeleteClientHttp', () => {
  let service: DeleteClientHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteClientHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
