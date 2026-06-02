import {TestBed} from '@angular/core/testing';

import {AddItemsHttp} from './add-items-http';

describe('AddItemsHttp', () => {
  let service: AddItemsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddItemsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
