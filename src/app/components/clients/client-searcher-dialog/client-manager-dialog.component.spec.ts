import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagerDialog } from './client-manager-dialog.component';

describe('ClientSearcherDialog', () => {
  let component: ClientManagerDialog;
  let fixture: ComponentFixture<ClientManagerDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientManagerDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientManagerDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
