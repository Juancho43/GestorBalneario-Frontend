import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonForm } from './season-form';

describe('SeasonForm', () => {
  let component: SeasonForm;
  let fixture: ComponentFixture<SeasonForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
