import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientEditator } from './client-editator';

describe('ClientEditator', () => {
  let component: ClientEditator;
  let fixture: ComponentFixture<ClientEditator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientEditator],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientEditator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
