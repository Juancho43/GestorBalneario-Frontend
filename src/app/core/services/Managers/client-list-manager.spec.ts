import { TestBed } from '@angular/core/testing';

import { ClientListManager } from './client-list-manager';

describe('ClientListManager', () => {
  let service: ClientListManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientListManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
