import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomMenu} from './custom-menu';

describe('CustomMenu', () => {
  let component: CustomMenu;
  let fixture: ComponentFixture<CustomMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
