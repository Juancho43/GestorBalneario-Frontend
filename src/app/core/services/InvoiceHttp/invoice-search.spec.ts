import {TestBed} from '@angular/core/testing';

import {InvoiceSearch} from './invoice-search';

describe('InvoiceSearch', () => {
  let service: InvoiceSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvoiceSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
