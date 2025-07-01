import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAcreditacionComponent } from './proceso-acreditacion.component';

describe('ProcesoAcreditacionComponent', () => {
  let component: ProcesoAcreditacionComponent;
  let fixture: ComponentFixture<ProcesoAcreditacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoAcreditacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoAcreditacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
