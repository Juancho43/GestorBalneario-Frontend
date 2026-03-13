import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMenu } from './about-menu';

describe('AboutMenu', () => {
  let component: AboutMenu;
  let fixture: ComponentFixture<AboutMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
