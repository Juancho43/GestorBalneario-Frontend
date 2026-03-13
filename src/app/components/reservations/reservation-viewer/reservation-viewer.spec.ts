import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationViewer } from './reservation-viewer';

describe('ReservationViewer', () => {
  let component: ReservationViewer;
  let fixture: ComponentFixture<ReservationViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
