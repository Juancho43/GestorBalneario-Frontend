import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShadowAdminPanel } from './shadow-admin-panel';

describe('ShadowAdminPanel', () => {
  let component: ShadowAdminPanel;
  let fixture: ComponentFixture<ShadowAdminPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowAdminPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowAdminPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
