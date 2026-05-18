import { TestBed } from '@angular/core/testing';

import { UpdateItemsHttp } from './update-items-http';

describe('UpdateItemsHttp', () => {
  let service: UpdateItemsHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateItemsHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
