import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowEditor } from './shadow-editor';

describe('ShadowEditor', () => {
  let component: ShadowEditor;
  let fixture: ComponentFixture<ShadowEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
