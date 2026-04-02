import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCreate } from './reservation-create';

describe('ReservationCreate', () => {
  let component: ReservationCreate;
  let fixture: ComponentFixture<ReservationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
