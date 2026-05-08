import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonList } from './season-list';

describe('SeasonList', () => {
  let component: SeasonList;
  let fixture: ComponentFixture<SeasonList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonList],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
