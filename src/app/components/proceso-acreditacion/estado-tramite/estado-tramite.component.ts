import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PasoTramite {
  titulo: string;
  descripcion: string;
  fecha: string;
  estado: 'completado' | 'en_proceso' | 'pendiente';
  observaciones?: string;
}

@Component({
  selector: 'app-estado-tramite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-tramite.component.html',
  styleUrls: ['./estado-tramite.component.scss']
})
export class EstadoTramiteComponent {
  @Input() numeroRegistro: string = '';
  @Input() establecimiento: any = {};
  
  // Datos del establecimiento para mostrar
  datosResumen = {
    nombre: 'AMERICAN DELI',
    representanteLegal: 'GUARDERAS RIOFRIO ESTEBAN',
    ruc: '1752072610001',
    actividad: 'RESTAURANTES, CEVICHERÍAS, PICANTERÍAS, CAFETERÍAS',
    ubicacion: 'BOLÍVAR, CHIMBO, SAN JOSÉ DE CHIMBO',
    telefono: '0961789810',
    email: 'fernanda@gmail.com'
  };
  
  pasosTramite: PasoTramite[] = [
    { 
      titulo: 'Datos generales de Persona Natural / Jurídica', 
      descripcion: 'Información del representante legal y personería jurídica completada correctamente', 
      fecha: new Date().toLocaleDateString('es-EC'),
      estado: 'completado'
    },
    { 
      titulo: 'Datos generales del establecimiento', 
      descripcion: 'Información del establecimiento turístico, ubicación y contacto registrados', 
      fecha: new Date().toLocaleDateString('es-EC'),
      estado: 'completado'
    },
    { 
      titulo: 'Revisión y Validación', 
      descripcion: 'Validación de toda la información proporcionada por el Ministerio de Turismo', 
      fecha: new Date().toLocaleDateString('es-EC'),
      estado: 'en_proceso',
      observaciones: 'En proceso de revisión técnica'
    },
    { 
      titulo: 'Emisión de Registro Turístico', 
      descripcion: 'Generación del número de registro turístico y certificado oficial', 
      fecha: 'Pendiente',
      estado: 'pendiente',
      observaciones: 'Se emitirá una vez completada la revisión'
    }
  ];

  // Documentos que fueron procesados
  documentosProcesados = [
    { nombre: 'Formulario de Datos Generales', estado: 'procesado', fecha: new Date().toLocaleDateString('es-EC') },
    { nombre: 'Información del Establecimiento', estado: 'procesado', fecha: new Date().toLocaleDateString('es-EC') },
    { nombre: 'Datos de Ubicación', estado: 'procesado', fecha: new Date().toLocaleDateString('es-EC') },
    { nombre: 'Información de Contacto', estado: 'procesado', fecha: new Date().toLocaleDateString('es-EC') }
  ];

  finalizarProceso(): void {
    console.log('Proceso de acreditación turística completado para:', this.establecimiento);
    
    // Simular asignación de número de registro
    const numeroRegistro = 'RT-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    alert(`¡Proceso completado exitosamente!\n\nNúmero de Registro Turístico: ${numeroRegistro}\n\nRecibirá una notificación por email con el certificado oficial.`);
  }

  get progresoCompletado(): number {
    const pasosCompletados = this.pasosTramite.filter(p => p.estado === 'completado').length;
    return (pasosCompletados / this.pasosTramite.length) * 100;
  }

  get estadoGeneral(): string {
    const completados = this.pasosTramite.filter(p => p.estado === 'completado').length;
    const enProceso = this.pasosTramite.filter(p => p.estado === 'en_proceso').length;
    
    if (completados === this.pasosTramite.length) {
      return 'Completado';
    } else if (enProceso > 0) {
      return 'En Proceso';
    } else {
      return 'Iniciado';
    }
  }

  descargarResumen(): void {
    console.log('Descargando resumen del proceso...');
    // Aquí implementarías la descarga del PDF
    alert('Función de descarga de resumen en desarrollo');
  }

  irAInicio(): void {
    console.log('Regresando a la página de establecimientos...');
    // Aquí navegarías a la página principal
  }
}