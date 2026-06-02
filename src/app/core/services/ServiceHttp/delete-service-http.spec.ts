import {TestBed} from '@angular/core/testing';

import {DeleteServiceHttp} from './delete-service-http';

describe('DeleteServiceHttp', () => {
  let service: DeleteServiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteServiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
