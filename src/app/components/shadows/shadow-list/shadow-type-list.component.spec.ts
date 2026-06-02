import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ShadowTypeList} from './shadow-type-list.component';

describe('ShadowList', () => {
  let component: ShadowTypeList;
  let fixture: ComponentFixture<ShadowTypeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShadowTypeList],
    }).compileComponents();

    fixture = TestBed.createComponent(ShadowTypeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
