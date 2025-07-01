import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalEstablecimientoComponent } from './personal-establecimiento.component';

describe('PersonalEstablecimientoComponent', () => {
  let component: PersonalEstablecimientoComponent;
  let fixture: ComponentFixture<PersonalEstablecimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalEstablecimientoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
