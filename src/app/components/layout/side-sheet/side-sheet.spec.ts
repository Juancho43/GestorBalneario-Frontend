import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideSheet } from './side-sheet';

describe('SideSheet', () => {
  let component: SideSheet;
  let fixture: ComponentFixture<SideSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(SideSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
