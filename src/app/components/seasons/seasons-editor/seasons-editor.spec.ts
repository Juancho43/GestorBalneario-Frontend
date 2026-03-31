import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsEditor } from './seasons-editor';

describe('SeasonsEditor', () => {
  let component: SeasonsEditor;
  let fixture: ComponentFixture<SeasonsEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonsEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonsEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
