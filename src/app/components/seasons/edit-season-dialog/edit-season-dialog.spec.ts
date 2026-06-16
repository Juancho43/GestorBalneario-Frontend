import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeasonDialog } from './edit-season-dialog';

describe('EditSeasonDialog', () => {
  let component: EditSeasonDialog;
  let fixture: ComponentFixture<EditSeasonDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSeasonDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditSeasonDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
