import { TestBed } from '@angular/core/testing';

import { EditServiceHttp } from './edit-service-http';

describe('EditServiceHttp', () => {
  let service: EditServiceHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditServiceHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
