import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceEditor } from './invoice-editor';

describe('InvoiceEditor', () => {
  let component: InvoiceEditor;
  let fixture: ComponentFixture<InvoiceEditor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceEditor],
    }).compileComponents();

    fixture = TestBed.createComponent(InvoiceEditor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
