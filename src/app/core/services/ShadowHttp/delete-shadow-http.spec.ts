import { TestBed } from '@angular/core/testing';

import { DeleteShadowHttp } from './delete-shadow-http';

describe('DeleteShadowHttp', () => {
  let service: DeleteShadowHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteShadowHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
