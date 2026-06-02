import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DateInputPicker} from './date-input-picker';

describe('DateInputPicker', () => {
  let component: DateInputPicker;
  let fixture: ComponentFixture<DateInputPicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateInputPicker],
    }).compileComponents();

    fixture = TestBed.createComponent(DateInputPicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
