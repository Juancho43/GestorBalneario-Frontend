import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEditor } from './service-editor';

describe('ServiceEditor', () => {
  let component: ServiceEditor;
  let fixture: ComponentFixture<ServiceEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
