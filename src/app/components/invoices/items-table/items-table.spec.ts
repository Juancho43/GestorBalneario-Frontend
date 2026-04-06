import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsTable } from './items-table';

describe('ItemsTable', () => {
  let component: ItemsTable;
  let fixture: ComponentFixture<ItemsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsTable],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
