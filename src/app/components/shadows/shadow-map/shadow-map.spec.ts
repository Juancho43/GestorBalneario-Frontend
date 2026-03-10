import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowMap } from './shadow-map';

describe('ShadowMap', () => {
  let component: ShadowMap;
  let fixture: ComponentFixture<ShadowMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowMap],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
