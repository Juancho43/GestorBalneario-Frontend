import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowDetail } from './shadow-detail';

describe('ShadowDetail', () => {
  let component: ShadowDetail;
  let fixture: ComponentFixture<ShadowDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
