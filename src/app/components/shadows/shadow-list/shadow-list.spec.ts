import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowList } from './shadow-list';

describe('ShadowList', () => {
  let component: ShadowList;
  let fixture: ComponentFixture<ShadowList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowList],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
