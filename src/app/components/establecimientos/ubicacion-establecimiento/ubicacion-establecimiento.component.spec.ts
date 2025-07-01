import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionEstablecimientoComponent } from './ubicacion-establecimiento.component';

describe('UbicacionEstablecimientoComponent', () => {
  let component: UbicacionEstablecimientoComponent;
  let fixture: ComponentFixture<UbicacionEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionEstablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UbicacionEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
