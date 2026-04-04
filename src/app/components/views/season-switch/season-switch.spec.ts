import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonSwitch } from './season-switch';

describe('SeasonSwitch', () => {
  let component: SeasonSwitch;
  let fixture: ComponentFixture<SeasonSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
