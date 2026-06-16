import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewClientDialog} from './new-client-dialog';

describe('NewClientDialog', () => {
  let component: NewClientDialog;
  let fixture: ComponentFixture<NewClientDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClientDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NewClientDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
