import { TestBed } from '@angular/core/testing';

import { EditClientHttp } from './edit-client-http';

describe('EditClientHttp', () => {
  let service: EditClientHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditClientHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
