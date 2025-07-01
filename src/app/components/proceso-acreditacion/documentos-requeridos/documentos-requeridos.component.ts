import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importar los componentes reales
import { DatosEstablecimientoComponent } from '../../establecimientos/datos-establecimiento/datos-establecimiento.component';
import { PersonalEstablecimientoComponent } from '../../establecimientos/personal-establecimiento/personal-establecimiento.component';
import { UbicacionEstablecimientoComponent } from '../../establecimientos/ubicacion-establecimiento/ubicacion-establecimiento.component';
import { ContactoEstablecimientoComponent } from '../../establecimientos/contacto-establecimiento/contacto-establecimiento.component';

// Importar interfaces
import { PersonaContacto, UbicacionEstablecimiento } from '../../../models/establecimiento.model';

@Component({
  selector: 'app-documentos-requeridos',
  standalone: true,
  imports: [
    CommonModule,
    DatosEstablecimientoComponent,
    PersonalEstablecimientoComponent,
    UbicacionEstablecimientoComponent,
    ContactoEstablecimientoComponent
  ],
  templateUrl: './documentos-requeridos.component.html',
  styleUrls: ['./documentos-requeridos.component.scss']
})
export class DocumentosRequeridosComponent implements OnInit {
  @Input() tipoTramite: string = '';
  @Input() establecimiento: any = {
    // Estructura inicial del establecimiento
    datosGenerales: null,
    personalEstablecimiento: null,
    ubicacion: null,
    personaContacto: null
  };
  @Output() documentosCompletos = new EventEmitter<boolean>();

  // Control de estado de cada componente
  estadoComponentes: { [key: number]: boolean } = {
    1: false, // Datos establecimiento
    2: false, // Personal
    3: false, // Ubicación
    4: false  // Contacto
  };

  totalComponentes = 4;
  mostrarDebug = true; // Cambia a false en producción

  ngOnInit(): void {
    this.verificarProgreso();
  }

  onComponenteCompleto(componenteId: number, completo: boolean): void {
    console.log(`Componente ${componenteId} completado:`, completo);
    this.estadoComponentes[componenteId] = completo;
    this.verificarProgreso();
  }

  // Método específico para recibir datos de contacto
  onContactoData(datos: PersonaContacto): void {
    console.log('Datos de contacto recibidos:', datos);
    this.establecimiento.personaContacto = datos;
  }

  // Método específico para recibir datos de ubicación
  onUbicacionData(datos: UbicacionEstablecimiento): void {
    console.log('Datos de ubicación recibidos:', datos);
    this.establecimiento.ubicacion = datos;
  }

  verificarProgreso(): void {
    const completo = this.todosComponentesCompletos;
    this.documentosCompletos.emit(completo);
    console.log('Progreso del paso 2:', {
      componentesCompletados: this.componentesCompletados,
      totalComponentes: this.totalComponentes,
      progresoPorcentaje: this.progresoPorcentaje,
      todosCompletos: completo,
      establecimiento: this.establecimiento
    });
  }

  get componentesCompletados(): number {
    return Object.values(this.estadoComponentes).filter(estado => estado === true).length;
  }

  get progresoPorcentaje(): number {
    return (this.componentesCompletados / this.totalComponentes) * 100;
  }

  get todosComponentesCompletos(): boolean {
    return this.componentesCompletados === this.totalComponentes;
  }

  // Métodos de navegación
  irAtras(): void {
    // Emitir evento al componente padre para ir al paso anterior
    console.log('Ir atrás desde paso 2');
  }

  guardarYContinuar(): void {
    if (this.todosComponentesCompletos) {
      console.log('Guardando datos del paso 2 y continuando...', this.establecimiento);
      this.documentosCompletos.emit(true);
    } else {
      console.warn('No todos los componentes están completos');
    }
  }

  // Métodos de debug
  completarTodos(): void {
    Object.keys(this.estadoComponentes).forEach(key => {
      this.estadoComponentes[+key] = true;
    });
    this.verificarProgreso();
  }

  // Método para llenar datos de prueba
  llenarDatosPrueba(): void {
    // Datos de prueba para contacto
    this.establecimiento.personaContacto = {
      cedulaIdentidad: '1755368089',
      datosRegistroCivil: 'ANDRADE CAÑAR FERNANDA ESTEFANIA',
      numeroTelefonoPrincipal: '0961789810',
      numeroTelefonoSecundario: '0961789810',
      correoElectronico: 'fernanda@gmail.com'
    };

    // Marcar como completado
    this.onComponenteCompleto(4, true);
  }
}