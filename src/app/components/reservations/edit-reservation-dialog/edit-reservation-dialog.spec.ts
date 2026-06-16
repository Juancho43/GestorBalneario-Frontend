import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationDialog } from './edit-reservation-dialog';

describe('EditReservationDialog', () => {
  let component: EditReservationDialog;
  let fixture: ComponentFixture<EditReservationDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReservationDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditReservationDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
