import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShadowListManager} from './shadow-list-manager';

describe('ShadowListManager', () => {
  let component: ShadowListManager;
  let fixture: ComponentFixture<ShadowListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowListManager],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowListManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
