import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShadowSearcher} from './shadow-searcher';

describe('ShadowSearcher', () => {
  let component: ShadowSearcher;
  let fixture: ComponentFixture<ShadowSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
