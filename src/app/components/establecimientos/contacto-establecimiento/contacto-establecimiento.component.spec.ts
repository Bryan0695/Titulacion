import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoEstablecimientoComponent } from './contacto-establecimiento.component';

describe('ContactoEstablecimientoComponent', () => {
  let component: ContactoEstablecimientoComponent;
  let fixture: ComponentFixture<ContactoEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoEstablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
