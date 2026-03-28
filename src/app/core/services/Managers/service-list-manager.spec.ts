import { TestBed } from '@angular/core/testing';

import { ServiceListManager } from './service-list-manager';

describe('ServiceListManager', () => {
  let service: ServiceListManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceListManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
