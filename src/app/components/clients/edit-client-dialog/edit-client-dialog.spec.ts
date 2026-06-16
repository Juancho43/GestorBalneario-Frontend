import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientDialog } from './edit-client-dialog';

describe('EditClientDialog', () => {
  let component: EditClientDialog;
  let fixture: ComponentFixture<EditClientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditClientDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditClientDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
