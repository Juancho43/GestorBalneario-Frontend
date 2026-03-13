import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSearcher } from './client-searcher';

describe('ClientSearcher', () => {
  let component: ClientSearcher;
  let fixture: ComponentFixture<ClientSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
