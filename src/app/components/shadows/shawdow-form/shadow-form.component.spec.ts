import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowForm } from './shadow-form.component';

describe('ShawdowForm', () => {
  let component: ShadowForm;
  let fixture: ComponentFixture<ShadowForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
