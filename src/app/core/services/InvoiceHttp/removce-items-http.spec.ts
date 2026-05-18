import { TestBed } from '@angular/core/testing';

import { RemoveItemsHttp } from './remove-items-http.service';

describe('RemovceItemsHttp', () => {
  let service: RemoveItemsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveItemsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
