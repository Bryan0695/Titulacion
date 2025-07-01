// ARCHIVO: src/app/components/proceso-acreditacion/formulario-registro/formulario-registro.component.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToggleSwitch } from 'primeng/toggleswitch';

@Component({
  selector: 'app-formulario-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToggleSwitch],
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.scss']
})
export class FormularioRegistroComponent implements OnInit {
  @Input() establecimiento: any = {};
  @Output() formularioCompleto = new EventEmitter<boolean>();
  
  formularioRegistro: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      tipoPersoneria: ['', Validators.required],
      documento1Presentado: [false], // Quitamos requiredTrue temporalmente
      documento2Presentado: [false]  // Quitamos requiredTrue temporalmente
    });
  }

  ngOnInit(): void {
    // Monitorear cambios en el formulario para determinar si está completo
    this.formularioRegistro.valueChanges.subscribe((values) => {
      console.log('Formulario cambió:', values);
      const completo = this.esFormularioCompleto();
      this.formularioCompleto.emit(completo);
      console.log('Cambio en formulario - Completo:', completo);
    });

    // Emitir estado inicial
    this.formularioCompleto.emit(this.esFormularioCompleto());
  }

  // Método personalizado para verificar si el formulario está completo
  esFormularioCompleto(): boolean {
    const tipoPersoneria = this.formularioRegistro.get('tipoPersoneria')?.value;
    const doc1 = this.formularioRegistro.get('documento1Presentado')?.value;
    const doc2 = this.formularioRegistro.get('documento2Presentado')?.value;
    
    // Verificar que tipoPersoneria no esté vacío y ambos documentos sean true
    const tipoValido = tipoPersoneria && tipoPersoneria.trim() !== '';
    const documentosValidos = doc1 === true && doc2 === true;
    
    const completo = tipoValido && documentosValidos;
    console.log('Verificando formulario:', { 
      tipoPersoneria, 
      tipoValido, 
      doc1, 
      doc2, 
      documentosValidos, 
      completo 
    });
    return completo;
  }

  onSubmit(): void {
    console.log('onSubmit ejecutado');
    if (this.esFormularioCompleto()) {
      console.log('Formulario válido - Datos:', this.formularioRegistro.value);
      // Emitir que el formulario está completo para avanzar al siguiente paso
      this.formularioCompleto.emit(true);
    } else {
      console.log('Formulario inválido');
      // Marcar todos los campos como tocados para mostrar errores
      this.formularioRegistro.markAllAsTouched();
    }
  }

  // Métodos para manejar los cambios en los toggle switches
  onToggle1Change(value: boolean): void {
    console.log('Toggle 1 cambiado a:', value, typeof value);
    // Asegurar que el valor sea boolean
    const boolValue = Boolean(value);
    this.formularioRegistro.patchValue({ documento1Presentado: boolValue });
    // Forzar actualización
    this.formularioRegistro.updateValueAndValidity();
    
    // Verificar inmediatamente el estado
    setTimeout(() => {
      console.log('Estado después del toggle 1:', this.formularioRegistro.value);
    }, 100);
  }

  onToggle2Change(value: boolean): void {
    console.log('Toggle 2 cambiado a:', value, typeof value);
    // Asegurar que el valor sea boolean
    const boolValue = Boolean(value);
    this.formularioRegistro.patchValue({ documento2Presentado: boolValue });
    // Forzar actualización
    this.formularioRegistro.updateValueAndValidity();
    
    // Verificar inmediatamente el estado
    setTimeout(() => {
      console.log('Estado después del toggle 2:', this.formularioRegistro.value);
    }, 100);
  }

  get tipoPersoneriaValido(): boolean {
    const control = this.formularioRegistro.get('tipoPersoneria');
    return control ? control.valid : false;
  }

  get documento1Valido(): boolean {
    const control = this.formularioRegistro.get('documento1Presentado');
    return control ? control.value === true : false;
  }

  get documento2Valido(): boolean {
    const control = this.formularioRegistro.get('documento2Presentado');
    return control ? control.value === true : false;
  }

  get formularioValido(): boolean {
    return this.esFormularioCompleto();
  }

  // Getters para los valores de los toggles
  get documento1Value(): boolean {
    const value = this.formularioRegistro.get('documento1Presentado')?.value;
    console.log('documento1Value getter:', value, typeof value);
    return Boolean(value);
  }

  get documento2Value(): boolean {
    const value = this.formularioRegistro.get('documento2Presentado')?.value;
    console.log('documento2Value getter:', value, typeof value);
    return Boolean(value);
  }

  // Método de prueba para forzar activación
  forzarActivacion(): void {
    console.log('Forzando activación de formulario...');
    this.formularioRegistro.patchValue({
      tipoPersoneria: this.formularioRegistro.get('tipoPersoneria')?.value || 'sociedad_anonima',
      documento1Presentado: true,
      documento2Presentado: true
    });
    this.formularioRegistro.updateValueAndValidity();
    console.log('Estado después de forzar:', this.formularioRegistro.value);
  }
}