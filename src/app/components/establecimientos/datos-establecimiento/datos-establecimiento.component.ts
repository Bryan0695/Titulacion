import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-datos-establecimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './datos-establecimiento.component.html',
  styleUrls: ['./datos-establecimiento.component.scss']
})
export class DatosEstablecimientoComponent implements OnInit {
  @Input() establecimiento: any = {};
  @Output() datosCompletos = new EventEmitter<boolean>();

  formularioDatos: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioDatos = this.fb.group({
      direccionWeb: ['', Validators.required] // Solo la URL es editable
    });
  }

  ngOnInit(): void {
    // Monitorear cambios en el formulario
    this.formularioDatos.valueChanges.subscribe(() => {
      const completo = this.formularioDatos.valid;
      this.datosCompletos.emit(completo);
    });

    // Emitir estado inicial (false porque la URL está vacía)
    this.datosCompletos.emit(false);
  }

  get formularioValido(): boolean {
    return this.formularioDatos.valid;
  }
}