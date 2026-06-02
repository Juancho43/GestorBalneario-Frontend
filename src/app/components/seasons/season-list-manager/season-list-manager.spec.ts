import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SeasonListManager} from './season-list-manager';

describe('SeasonListManager', () => {
  let component: SeasonListManager;
  let fixture: ComponentFixture<SeasonListManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonListManager],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonListManager);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
