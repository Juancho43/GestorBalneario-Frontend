import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceListManager} from './service-list-manager';

describe('ServiceListManager', () => {
  let component: ServiceListManager;
  let fixture: ComponentFixture<ServiceListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceListManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceListManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
