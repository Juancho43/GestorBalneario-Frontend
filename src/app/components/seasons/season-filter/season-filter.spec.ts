import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeasonFilter} from './season-filter';

describe('SeasonFilter', () => {
  let component: SeasonFilter;
  let fixture: ComponentFixture<SeasonFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
