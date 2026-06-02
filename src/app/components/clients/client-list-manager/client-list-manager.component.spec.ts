import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClientListManagerComponent} from './client-list-manager.component';

describe('ClientListManager', () => {
  let component: ClientListManagerComponent;
  let fixture: ComponentFixture<ClientListManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientListManagerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientListManagerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
