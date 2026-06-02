import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeasonSearcher} from './season-searcher';

describe('SeasonSearcher', () => {
  let component: SeasonSearcher;
  let fixture: ComponentFixture<SeasonSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
