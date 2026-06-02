import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeasonCard} from './season-card';

describe('SeasonCard', () => {
  let component: SeasonCard;
  let fixture: ComponentFixture<SeasonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonCard],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
