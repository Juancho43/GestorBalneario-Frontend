import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShadowFilter} from './shadow-filter';

describe('ShadowFilter', () => {
  let component: ShadowFilter;
  let fixture: ComponentFixture<ShadowFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
