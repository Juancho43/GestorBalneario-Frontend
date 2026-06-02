import {TestBed} from '@angular/core/testing';

import {DeleteSeasonHttp} from './delete-season-http.service';

describe('DeleteClientHttp', () => {
  let service: DeleteSeasonHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteSeasonHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
