import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetails } from './service-details';

describe('ServiceDetails', () => {
  let component: ServiceDetails;
  let fixture: ComponentFixture<ServiceDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
