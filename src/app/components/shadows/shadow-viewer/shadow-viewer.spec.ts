import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowViewer } from './shadow-viewer';

describe('ShadowViewer', () => {
  let component: ShadowViewer;
  let fixture: ComponentFixture<ShadowViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
