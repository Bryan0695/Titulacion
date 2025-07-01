import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentosRequeridosComponent } from './documentos-requeridos.component';

describe('DocumentosRequeridosComponent', () => {
  let component: DocumentosRequeridosComponent;
  let fixture: ComponentFixture<DocumentosRequeridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentosRequeridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentosRequeridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
