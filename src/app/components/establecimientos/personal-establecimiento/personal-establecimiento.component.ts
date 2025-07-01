import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-establecimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './personal-establecimiento.component.html',
  styleUrls: ['./personal-establecimiento.component.scss']
})
export class PersonalEstablecimientoComponent implements OnInit {
  @Input() establecimiento: any = {};
  @Output() personalCompleto = new EventEmitter<boolean>();

  formularioPersonal: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioPersonal = this.fb.group({
      totalHombres: [0, [Validators.required, Validators.min(0)]],
      hombresDiscapacidad: [0, [Validators.required, Validators.min(0)]],
      totalMujeres: [0, [Validators.required, Validators.min(0)]],
      mujeresDiscapacidad: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    // Monitorear cambios en el formulario
    this.formularioPersonal.valueChanges.subscribe(() => {
      const completo = this.esFormularioValido();
      this.personalCompleto.emit(completo);
    });

    // Emitir estado inicial
    this.personalCompleto.emit(this.esFormularioValido());
  }

  esFormularioValido(): boolean {
    // Consideramos válido cuando al menos hay algún valor mayor a 0
    const valores = this.formularioPersonal.value;
    const tienePersonal = valores.totalHombres > 0 || valores.totalMujeres > 0;
    
    // Validar que las discapacidades no sean mayores que los totales
    const discapacidadHombresValida = valores.hombresDiscapacidad <= valores.totalHombres;
    const discapacidadMujeresValida = valores.mujeresDiscapacidad <= valores.totalMujeres;
    
    return tienePersonal && discapacidadHombresValida && discapacidadMujeresValida;
  }

  // Validaciones específicas
  validarDiscapacidadHombres(): void {
    const totalHombres = this.formularioPersonal.get('totalHombres')?.value || 0;
    const discapacidad = this.formularioPersonal.get('hombresDiscapacidad')?.value || 0;
    
    if (discapacidad > totalHombres) {
      this.formularioPersonal.patchValue({ hombresDiscapacidad: totalHombres });
    }
  }

  validarDiscapacidadMujeres(): void {
    const totalMujeres = this.formularioPersonal.get('totalMujeres')?.value || 0;
    const discapacidad = this.formularioPersonal.get('mujeresDiscapacidad')?.value || 0;
    
    if (discapacidad > totalMujeres) {
      this.formularioPersonal.patchValue({ mujeresDiscapacidad: totalMujeres });
    }
  }

  get totalPersonal(): number {
    const valores = this.formularioPersonal.value;
    return (valores.totalHombres || 0) + (valores.totalMujeres || 0);
  }

  get totalDiscapacidad(): number {
    const valores = this.formularioPersonal.value;
    return (valores.hombresDiscapacidad || 0) + (valores.mujeresDiscapacidad || 0);
  }

  // Métodos para los botones spinner
  incrementarCampo(campo: string): void {
    const valorActual = this.formularioPersonal.get(campo)?.value || 0;
    this.formularioPersonal.patchValue({ [campo]: valorActual + 1 });
    
    if (campo === 'totalHombres') {
      this.validarDiscapacidadHombres();
    } else if (campo === 'totalMujeres') {
      this.validarDiscapacidadMujeres();
    }
  }

  decrementarCampo(campo: string): void {
    const valorActual = this.formularioPersonal.get(campo)?.value || 0;
    if (valorActual > 0) {
      this.formularioPersonal.patchValue({ [campo]: valorActual - 1 });
      
      if (campo === 'totalHombres') {
        this.validarDiscapacidadHombres();
      } else if (campo === 'totalMujeres') {
        this.validarDiscapacidadMujeres();
      }
    }
  }
}