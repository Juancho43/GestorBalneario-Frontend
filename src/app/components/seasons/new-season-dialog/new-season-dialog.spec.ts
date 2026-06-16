import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewSeasonDialog} from './new-season-dialog';

describe('NewSeasonDialog', () => {
  let component: NewSeasonDialog;
  let fixture: ComponentFixture<NewSeasonDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSeasonDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NewSeasonDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
