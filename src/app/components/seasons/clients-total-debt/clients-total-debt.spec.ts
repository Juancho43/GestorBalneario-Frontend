import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTotalDebt } from './clients-total-debt';

describe('ClientsTotalDebt', () => {
  let component: ClientsTotalDebt;
  let fixture: ComponentFixture<ClientsTotalDebt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTotalDebt],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTotalDebt);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
