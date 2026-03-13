import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCard } from './client-card';

describe('ClientCard', () => {
  let component: ClientCard;
  let fixture: ComponentFixture<ClientCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
