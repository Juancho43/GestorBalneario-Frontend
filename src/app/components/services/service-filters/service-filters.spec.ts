import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceFilters} from './service-filters';

describe('ServiceFilters', () => {
  let component: ServiceFilters;
  let fixture: ComponentFixture<ServiceFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
