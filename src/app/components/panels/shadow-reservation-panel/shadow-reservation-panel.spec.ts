import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShadowReservationPanel} from './shadow-reservation-panel';

describe('ShadowReservationPanel', () => {
  let component: ShadowReservationPanel;
  let fixture: ComponentFixture<ShadowReservationPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowReservationPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowReservationPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
