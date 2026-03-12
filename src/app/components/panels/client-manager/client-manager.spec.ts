import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManager } from './client-manager';

describe('ClientManager', () => {
  let component: ClientManager;
  let fixture: ComponentFixture<ClientManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
