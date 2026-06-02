import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InvoiceViewer} from './invoice-viewer';

describe('InvoiceViewer', () => {
  let component: InvoiceViewer;
  let fixture: ComponentFixture<InvoiceViewer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceViewer],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceViewer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
