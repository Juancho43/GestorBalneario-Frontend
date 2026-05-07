import { TestBed } from '@angular/core/testing';

import { ServiceManager } from './service-manager';

describe('ServiceManager', () => {
  let service: ServiceManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
