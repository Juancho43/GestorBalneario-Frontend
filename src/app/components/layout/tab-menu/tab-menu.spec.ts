import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenu } from './tab-menu';

describe('TabMenu', () => {
  let component: TabMenu;
  let fixture: ComponentFixture<TabMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(TabMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
