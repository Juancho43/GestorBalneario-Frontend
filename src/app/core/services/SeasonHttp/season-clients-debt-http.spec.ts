import { TestBed } from '@angular/core/testing';

import { SeasonClientsDebtHttp } from './season-clients-debt-http';

describe('SeasonClientsDebtHttp', () => {
  let service: SeasonClientsDebtHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeasonClientsDebtHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
