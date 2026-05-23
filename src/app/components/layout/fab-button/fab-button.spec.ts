import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FABButton } from './fab-button';

describe('FABButton', () => {
  let component: FABButton;
  let fixture: ComponentFixture<FABButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FABButton],
    }).compileComponents();

    fixture = TestBed.createComponent(FABButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
