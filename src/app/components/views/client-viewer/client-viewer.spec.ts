import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewer } from './client-viewer';

describe('ClientViewer', () => {
  let component: ClientViewer;
  let fixture: ComponentFixture<ClientViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
