import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServiceDialog } from './new-service-dialog';

describe('NewServiceDialog', () => {
  let component: NewServiceDialog;
  let fixture: ComponentFixture<NewServiceDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewServiceDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(NewServiceDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
