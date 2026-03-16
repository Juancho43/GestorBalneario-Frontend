import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShadow } from './new-shadow';

describe('NewShadow', () => {
  let component: NewShadow;
  let fixture: ComponentFixture<NewShadow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewShadow],
    }).compileComponents();

    fixture = TestBed.createComponent(NewShadow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
