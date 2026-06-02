import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceSearcher} from './invoice-searcher';

describe('InvoiceSearcher', () => {
  let component: InvoiceSearcher;
  let fixture: ComponentFixture<InvoiceSearcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceSearcher],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceSearcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
