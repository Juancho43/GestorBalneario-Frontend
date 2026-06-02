import {TestBed} from '@angular/core/testing';

import {ClientManager} from './client-manager.service';

describe('ClientListManager', () => {
  let service: ClientManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
