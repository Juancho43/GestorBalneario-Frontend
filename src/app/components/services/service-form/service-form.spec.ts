import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceForm } from './service-form';

describe('ServiceForm', () => {
  let component: ServiceForm;
  let fixture: ComponentFixture<ServiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
