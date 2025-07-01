import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Modelo para persona de contacto
import { PersonaContacto } from '../../../models/establecimiento.model';

@Component({
  selector: 'app-contacto-establecimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacto-establecimiento.component.html',
  styleUrls: ['./contacto-establecimiento.component.scss']
})
export class ContactoEstablecimientoComponent implements OnInit {
  @Input() establecimiento: any = {};
  @Output() contactoCompleto = new EventEmitter<boolean>();
  @Output() contactoData = new EventEmitter<PersonaContacto>();

  formularioContacto: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formularioContacto = this.fb.group({
      cedulaIdentidad: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      datosRegistroCivil: ['', Validators.required],
      numeroTelefonoPrincipal: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      numeroTelefonoSecundario: ['', [Validators.pattern(/^\d{9,10}$/)]],
      correoElectronico: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    // Monitorear cambios en el formulario
    this.formularioContacto.valueChanges.subscribe(() => {
      const completo = this.formularioContacto.valid;
      this.contactoCompleto.emit(completo);
      
      if (completo) {
        this.contactoData.emit(this.getContactoData());
      }
    });

    // Emitir estado inicial
    this.contactoCompleto.emit(this.formularioContacto.valid);
    
    // Si hay datos previos del establecimiento, cargarlos
    this.cargarDatosPrevios();
  }

  // Método para buscar datos del registro civil por cédula
  buscarDatosRegistroCivil(): void {
    const cedula = this.formularioContacto.get('cedulaIdentidad')?.value;
    
    if (cedula && this.validarCedula(cedula)) {
      // Aquí iría la llamada al servicio real del registro civil
      // Por ahora simulamos una respuesta
      this.simularBusquedaRegistroCivil(cedula);
    }
  }

  // Simulación de búsqueda en registro civil
  private simularBusquedaRegistroCivil(cedula: string): void {
    // Simulamos algunos datos de ejemplo
    const datosSimulados: { [key: string]: string } = {
      '1755368089': 'ANDRADE CAÑAR FERNANDA ESTEFANIA',
      '0961789810': 'PÉREZ GARCÍA JUAN CARLOS',
      '1234567890': 'GARCÍA LÓPEZ MARÍA FERNANDA'
    };

    const nombreCompleto = datosSimulados[cedula] || 'PERSONA NO ENCONTRADA';
    
    this.formularioContacto.patchValue({
      datosRegistroCivil: nombreCompleto
    });
  }

  // Validación básica de cédula ecuatoriana
  private validarCedula(cedula: string): boolean {
    if (cedula.length !== 10) return false;
    
    const digitos = cedula.split('').map(Number);
    const provincia = parseInt(cedula.substring(0, 2));
    
    if (provincia < 1 || provincia > 24) return false;
    
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;
    
    for (let i = 0; i < 9; i++) {
      let resultado = digitos[i] * coeficientes[i];
      if (resultado > 9) resultado -= 9;
      suma += resultado;
    }
    
    const digitoVerificador = digitos[9];
    const residuo = suma % 10;
    const digitoCalculado = residuo === 0 ? 0 : 10 - residuo;
    
    return digitoCalculado === digitoVerificador;
  }

  // Método para obtener los datos en el formato del modelo
  getContactoData(): PersonaContacto {
    const valores = this.formularioContacto.value;
    return {
      cedulaIdentidad: valores.cedulaIdentidad,
      datosRegistroCivil: valores.datosRegistroCivil,
      numeroTelefonoPrincipal: valores.numeroTelefonoPrincipal,
      numeroTelefonoSecundario: valores.numeroTelefonoSecundario || '',
      correoElectronico: valores.correoElectronico
    };
  }

  // Método para cargar datos previos si existen
  cargarDatosPrevios(): void {
    if (this.establecimiento?.personaContacto) {
      const personaContacto = this.establecimiento.personaContacto;
      this.formularioContacto.patchValue(personaContacto);
    }
  }

  // Método para ir atrás
  irAtras(): void {
    // Aquí puedes emitir un evento para ir al paso anterior
    console.log('Ir atrás');
  }

  // Método para guardar y continuar
  guardarYContinuar(): void {
    if (this.formularioContacto.valid) {
      // Aquí puedes emitir un evento para ir al siguiente paso
      console.log('Guardar y continuar', this.getContactoData());
    } else {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.formularioContacto.controls).forEach(key => {
        this.formularioContacto.get(key)?.markAsTouched();
      });
    }
  }

  // Getters para validaciones en el template
  get cedulaValida(): boolean {
    const cedula = this.formularioContacto.get('cedulaIdentidad')?.value;
    return cedula && this.validarCedula(cedula);
  }

  get mostrarErrorCedula(): boolean {
    const cedulaControl = this.formularioContacto.get('cedulaIdentidad');
    return !!(cedulaControl?.invalid && cedulaControl?.touched);
  }

  get mostrarErrorTelefonoPrincipal(): boolean {
    const telefonoControl = this.formularioContacto.get('numeroTelefonoPrincipal');
    return !!(telefonoControl?.invalid && telefonoControl?.touched);
  }

  get mostrarErrorCorreo(): boolean {
    const correoControl = this.formularioContacto.get('correoElectronico');
    return !!(correoControl?.invalid && correoControl?.touched);
  }

  get mostrarErrorRegistroCivil(): boolean {
    const registroControl = this.formularioContacto.get('datosRegistroCivil');
    return !!(registroControl?.invalid && registroControl?.touched);
  }
}