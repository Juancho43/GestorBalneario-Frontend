import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ServiceSearcher} from './service-searcher';

describe('ServiceSearcher', () => {
  let component: ServiceSearcher;
  let fixture: ComponentFixture<ServiceSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
