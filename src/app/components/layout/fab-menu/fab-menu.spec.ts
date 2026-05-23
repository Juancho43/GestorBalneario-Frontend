import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FABMenu } from './fab-menu';

describe('FABMenu', () => {
  let component: FABMenu;
  let fixture: ComponentFixture<FABMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FABMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(FABMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
