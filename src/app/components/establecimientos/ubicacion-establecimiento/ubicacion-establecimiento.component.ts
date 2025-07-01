import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importar los enums y constantes actualizados
import { 
  ProvinciaCodigo, 
  PROVINCIAS_DATA, 
  CANTONES_DATA, 
  PARROQUIAS_DATA, 
  COORDENADAS_PARROQUIAS 
} from '../../../enums/establecimiento.enums';

// Modelo actualizado para ubicación
import { UbicacionEstablecimiento } from '../../../models/establecimiento.model';

interface UbicacionData {
  codigo: string;
  nombre: string;
  padre?: string;
}

@Component({
  selector: 'app-ubicacion-establecimiento',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ubicacion-establecimiento.component.html',
  styleUrls: ['./ubicacion-establecimiento.component.scss']
})
export class UbicacionEstablecimientoComponent implements OnInit {
  @Input() establecimiento: any = {};
  @Output() ubicacionCompleta = new EventEmitter<boolean>();
  @Output() ubicacionData = new EventEmitter<UbicacionEstablecimiento>();

  formularioUbicacion: FormGroup;

  // Datos de ubicación usando los enums
  provincias: UbicacionData[] = PROVINCIAS_DATA;
  cantones: (UbicacionData & { provincia: string })[] = CANTONES_DATA;
  parroquias: (UbicacionData & { canton: string })[] = PARROQUIAS_DATA;

  // Listas filtradas
  cantonesFiltrados: (UbicacionData & { provincia: string })[] = [];
  parroquiasFiltradas: (UbicacionData & { canton: string })[] = [];

  constructor(private fb: FormBuilder) {
    this.formularioUbicacion = this.fb.group({
      provincia: [ProvinciaCodigo.BOLIVAR, Validators.required],
      canton: ['', Validators.required],
      parroquia: ['', Validators.required],
      callePrincipal: ['', Validators.required],
      numeracion: ['', Validators.required],
      calleInterseccion: ['', Validators.required],
      referenciaUbicacion: ['', Validators.required],
      latitud: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitud: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  ngOnInit(): void {
    // Cargar datos iniciales
    this.onProvinciaChange();
    this.onCantonChange();

    // Monitorear cambios en el formulario
    this.formularioUbicacion.valueChanges.subscribe(() => {
      const completo = this.formularioUbicacion.valid;
      this.ubicacionCompleta.emit(completo);
      
      if (completo) {
        this.ubicacionData.emit(this.getUbicacionData());
      }
    });

    // Emitir estado inicial
    this.ubicacionCompleta.emit(this.formularioUbicacion.valid);
    
    // Si hay datos previos del establecimiento, cargarlos
    this.cargarDatosPrevios();
  }

  onProvinciaChange(): void {
    const provinciaSeleccionada = this.formularioUbicacion.get('provincia')?.value;
    this.cantonesFiltrados = this.cantones.filter(c => c.provincia === provinciaSeleccionada);
    
    // Resetear cantón y parroquia
    if (this.cantonesFiltrados.length > 0) {
      this.formularioUbicacion.patchValue({ 
        canton: this.cantonesFiltrados[0].codigo,
        parroquia: ''
      });
      this.onCantonChange();
    } else {
      // Si no hay cantones para la provincia, limpiar
      this.cantonesFiltrados = [];
      this.parroquiasFiltradas = [];
      this.formularioUbicacion.patchValue({ canton: '', parroquia: '' });
    }
  }

  onCantonChange(): void {
    const cantonSeleccionado = this.formularioUbicacion.get('canton')?.value;
    this.parroquiasFiltradas = this.parroquias.filter(p => p.canton === cantonSeleccionado);
    
    // Resetear parroquia
    if (this.parroquiasFiltradas.length > 0) {
      this.formularioUbicacion.patchValue({ 
        parroquia: this.parroquiasFiltradas[0].codigo
      });
      this.onParroquiaChange();
    } else {
      this.parroquiasFiltradas = [];
      this.formularioUbicacion.patchValue({ parroquia: '' });
    }
  }

  onParroquiaChange(): void {
    const parroquiaSeleccionada = this.formularioUbicacion.get('parroquia')?.value;
    
    // Cargar coordenadas predefinidas si existen
    if (COORDENADAS_PARROQUIAS[parroquiaSeleccionada]) {
      const coords = COORDENADAS_PARROQUIAS[parroquiaSeleccionada];
      this.formularioUbicacion.patchValue({
        latitud: coords.lat,
        longitud: coords.lng
      });
    }
  }

  get coordenadasValidas(): boolean {
    const lat = this.formularioUbicacion.get('latitud')?.value;
    const lng = this.formularioUbicacion.get('longitud')?.value;
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }

  get direccionCompleta(): string {
    const valores = this.formularioUbicacion.value;
    const provincia = this.provincias.find(p => p.codigo === valores.provincia)?.nombre || '';
    const canton = this.cantonesFiltrados.find(c => c.codigo === valores.canton)?.nombre || '';
    const parroquia = this.parroquiasFiltradas.find(p => p.codigo === valores.parroquia)?.nombre || '';
    
    return `${valores.callePrincipal} ${valores.numeracion}, ${parroquia}, ${canton}, ${provincia}`;
  }

  // Método para autocompletar dirección basada en ubicación conocida
  autocompletarDireccion(): void {
    const parroquia = this.formularioUbicacion.get('parroquia')?.value;
    
    // Datos de ejemplo para San José de Chimbo
    if (parroquia === 'SJC') {
      this.formularioUbicacion.patchValue({
        callePrincipal: 'Calle Principal',
        numeracion: 'S/N',
        calleInterseccion: 'Vía a Guaranda',
        referenciaUbicacion: 'Frente al parque central de San José de Chimbo'
      });
    }
  }

  // Método para obtener los datos de ubicación en el formato del modelo
  getUbicacionData(): UbicacionEstablecimiento {
    const valores = this.formularioUbicacion.value;
    return {
      provincia: valores.provincia,
      canton: valores.canton,
      parroquia: valores.parroquia,
      callePrincipal: valores.callePrincipal,
      numeracion: valores.numeracion,
      calleInterseccion: valores.calleInterseccion,
      referenciaUbicacion: valores.referenciaUbicacion,
      latitud: parseFloat(valores.latitud),
      longitud: parseFloat(valores.longitud)
    };
  }

  // Método para cargar datos previos si existen
  cargarDatosPrevios(): void {
    if (this.establecimiento?.ubicacion) {
      const ubicacion = this.establecimiento.ubicacion;
      this.formularioUbicacion.patchValue(ubicacion);
      
      // Actualizar listas filtradas basadas en los datos cargados
      this.onProvinciaChange();
      setTimeout(() => {
        this.formularioUbicacion.patchValue({
          canton: ubicacion.canton,
          parroquia: ubicacion.parroquia
        });
      });
    }
  }

  // Método para validar el formulario
  validarFormulario(): boolean {
    if (this.formularioUbicacion.invalid) {
      // Marcar todos los campos como tocados para mostrar errores
      Object.keys(this.formularioUbicacion.controls).forEach(key => {
        this.formularioUbicacion.get(key)?.markAsTouched();
      });
      return false;
    }
    return true;
  }

  // Getter para obtener errores de campos específicos
  getErrorMessage(fieldName: string): string {
    const field = this.formularioUbicacion.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['min']) return `Valor mínimo no válido`;
      if (field.errors['max']) return `Valor máximo no válido`;
    }
    return '';
  }

  // Método para limpiar el formulario
  limpiarFormulario(): void {
    this.formularioUbicacion.reset({
      provincia: ProvinciaCodigo.BOLIVAR,
      canton: '',
      parroquia: '',
      callePrincipal: '',
      numeracion: '',
      calleInterseccion: '',
      referenciaUbicacion: '',
      latitud: '',
      longitud: ''
    });
    this.onProvinciaChange();
  }

  // Métodos getter para usar en el template
  get provinciaNombre(): string {
    const provinciaSeleccionada = this.formularioUbicacion.get('provincia')?.value;
    return this.provincias.find(p => p.codigo == provinciaSeleccionada)?.nombre || 'N/A';
  }

  get cantonNombre(): string {
    const cantonSeleccionado = this.formularioUbicacion.get('canton')?.value;
    return this.cantonesFiltrados.find(c => c.codigo == cantonSeleccionado)?.nombre || 'N/A';
  }

  get parroquiaNombre(): string {
    const parroquiaSeleccionada = this.formularioUbicacion.get('parroquia')?.value;
    return this.parroquiasFiltradas.find(p => p.codigo == parroquiaSeleccionada)?.nombre || 'N/A';
  }

  get latitudValue(): number | null {
    return this.formularioUbicacion.get('latitud')?.value || null;
  }

  get longitudValue(): number | null {
    return this.formularioUbicacion.get('longitud')?.value || null;
  }
}